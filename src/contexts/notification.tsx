/**
 * This context is used for pushing notifications for display near the top of
 * the component tree. Internally it uses a simple reducer, splitting its state
 * and dispatch to two separate contexts, to avoid needless re-renders of
 * components that only use the dispatch. These contexts are accessible only
 * with custom hooks: one for the current notification, and another for a
 * "Notifier" that encapsulates the timeout-dispatching mess.
 */

import { createContext, Dispatch, FC, PropsWithChildren, useContext, useMemo, useReducer } from "react"
import { assertNever } from "../util"

interface Notification {
  type: "success" | "error" | "none"
  message: string
}

interface Notifier {
  notifySuccess: (message: string) => void
  notifyError: (message: string) => void
}

type State = Notification & { timer?: number }

type Action = {
  type: "set",
  payload: State
} | {
  type: "reset",
  payload?: never
}

const emptyNotification: Notification = {
  type: "none",
  message: ""
}

const reducer = ({ timer }: State, { type, payload }: Action): State => {
  switch (type) {
    case "set": {
      clearTimeout(timer)
      return payload
    }
    case "reset": {
      clearTimeout(timer)
      return emptyNotification
    }
    default:
      return assertNever(type)
  }
}

const createNotifier = (dispatch: Dispatch<Action>): Notifier => {
  const notify = (message: string, type: "success" | "error") => {
    const timer = window.setTimeout(() => dispatch({ type: "reset" }), 5000)
    const payload = { type, message, timer }
    dispatch({ type: "set", payload })
  }
  return {
    notifySuccess: (message) => notify(message, "success"),
    notifyError: (message) => notify(message, "error")
  }
}

const NotificationContext = createContext<Notification | undefined>(undefined)
const NotifierContext = createContext<Notifier | undefined>(undefined)

export const NotificationProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [{ timer, ...notification }, dispatch ] = useReducer(reducer, emptyNotification)
  const notifier = useMemo(
    () => createNotifier(dispatch),
    [ dispatch ]
  )
  return (
    <NotifierContext.Provider value={notifier}>
      <NotificationContext.Provider value={notification}>
        {children}
      </NotificationContext.Provider>
    </NotifierContext.Provider>
  )
}

export const useNotification = (): Notification => {
  const notification = useContext(NotificationContext)
  if (!notification) {
    throw new Error("'useNotification()' may only be used from within NotificationProvider")
  }
  return notification
}

export const useNotifier = (): Notifier => {
  const notifier = useContext(NotifierContext)
  if (!notifier) {
    throw new Error("'useNotifier()' may only be used from within NotificationProvider")
  }
  return notifier
}
