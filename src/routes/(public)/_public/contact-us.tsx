import { createFileRoute } from '@tanstack/react-router'
import { ContactUs } from '~/features/public/pages/contact-us'

export const Route = createFileRoute('/(public)/_public/contact-us')({
  component: () => <ContactUs />,
})

