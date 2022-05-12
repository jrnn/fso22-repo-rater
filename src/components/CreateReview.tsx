import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import Button from "./Button"
import ControlledTextInput from "./ControlledTextInput"
import { useCreateReview } from "../hooks"
import { theme } from "../theme"
import { CreateReviewFormInputs } from "../types"
import { isEmpty } from "../util"

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.regular
  }
})

const CreateReview = () => {
  const { createReview } = useCreateReview()
  const form = useForm<CreateReviewFormInputs>({
    defaultValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: ""
    }
  })
  const { formState: { errors }, handleSubmit } = form
  const onSubmit: SubmitHandler<CreateReviewFormInputs> = values => createReview(values)

  return (
    <FormProvider { ...form }>
      <View style={styles.container}>
        <ControlledTextInput
          name="ownerName"
          placeholder="Repository owner name"
          rules={{
            required: true
          }}
        />
        <ControlledTextInput
          name="repositoryName"
          placeholder="Repository name"
          rules={{
            required: true
          }}
        />
        <ControlledTextInput
          name="rating"
          placeholder="Rating on a scale from 0 to 100"
          rules={{
            validate: {
              rating: n => !!n && !isNaN(n) && 0 <= Number(n) && Number(n) <= 100
            }
          }}
        />
        <ControlledTextInput
          expanding
          name="text"
          placeholder="Review (optional)"
        />
        <Button
          disabled={!isEmpty(errors)}
          label="CREATE REVIEW"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </FormProvider>
  )
}

export default CreateReview
