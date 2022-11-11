import {
  FieldError,
  Form,
  Label,
  Submit,
  TextAreaField,
  TextField,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [create, { loading, error }] = useMutation(CREATE_CONTACT)

  function onSubmit(data) {
    create({ variables: { input: data } })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <h2>ContactPage</h2>
      <Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
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
