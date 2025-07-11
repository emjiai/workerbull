import JoinSection from '@/components/masterclass/JoinSection'
import TopicsSection from '@/components/masterclass/TopicsSection'
import ToolsSection from '@/components/masterclass/ToolsSection'
import RegisterForm from '@/components/masterclass/RegisterForm'

export const metadata = {
  title: 'One-Day Masterclass | WorkerBull',
  description: 'Join our intensive 6-hour masterclass to fast-track your AI product development and integration skills.',
}

export default function MasterclassPage() {
  return (
    <>
      <JoinSection />
      <TopicsSection />
      <ToolsSection />
      <RegisterForm />
    </>
  )
}
