import { StyleSheet, View } from "react-native"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
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

const ratingErrorMessage = "Rating must be an integer between 0 and 100"
const schema = yup.object().shape({
  ownerName: yup.string().required("Owner name cannot be empty"),
  repositoryName: yup.string().required("Repository name cannot be empty"),
  rating: yup.number()
    .typeError(ratingErrorMessage)
    .moreThan(-1, ratingErrorMessage)
    .lessThan(101, ratingErrorMessage)
})

const CreateReview = () => {
  const { createReview } = useCreateReview()
  const form = useForm<CreateReviewFormInputs>({
    resolver: yupResolver(schema),
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
        />
        <ControlledTextInput
          name="repositoryName"
          placeholder="Repository name"
        />
        <ControlledTextInput
          name="rating"
          placeholder="Rating on a scale from 0 to 100"
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
