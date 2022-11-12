import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('🥳 Contact Successfully Submitted! 🥳')
      formMethods.reset()
    },
  })

  const formMethods = useForm({ mode: 'onBlur' })

  function onSubmit(data) {
    create({ variables: { input: data } })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <h2>ContactPage</h2>
      <Form
        config={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
        onSubmit={onSubmit}
      >
        <FormError error={error} wrapperClassName="form-error" />
        <Label name="firstName" errorClassName="error">
          First Name
        </Label>
        <TextField
          name="firstName"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError className="error" name="firstName" />

        <Label name="lastName" errorClassName="error">
          Last Name
        </Label>
        <TextField
          name="lastName"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError className="error" name="lastName" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address.',
            },
          }}
          errorClassName="error"
        />
        <FieldError className="error" name="email" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError className="error" name="message" />

        <Submit disabled={loading}>Submit Message</Submit>
      </Form>
    </>
  )
}

export default ContactPage
