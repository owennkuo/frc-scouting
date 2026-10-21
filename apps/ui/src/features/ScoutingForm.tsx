import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function ScoutingForm() {
  return (
    <Tabs defaultValue="overview" className="">
      <TabsList>
        <TabsTrigger value="auto">Auto</TabsTrigger>
        <TabsTrigger value="tele">Teleop</TabsTrigger>
        <TabsTrigger value="endgame">Endgame</TabsTrigger>
        </TabsList>
        <TabsContent value="auto">
          <Card className="">
            <CardTitle>Autonomous</CardTitle>
            <CardContent>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
  )
}
