import { Hero } from "@/components/hero"
import { ActiveCampaigns } from "@/components/active-campaigns"
import { Notices } from "@/components/notices"
import { OrganizationInfo } from "@/components/organization-info"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <OrganizationInfo />
      <ActiveCampaigns />
      <Notices />
    </div>
  )
}
