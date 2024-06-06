import React, {useState} from "react";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import AnalyticsProductsCard from "@/components/metrics/analytics-products-card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import AnalyticsTotalEarningsCard from "@/components/metrics/analytics-total-earnings-card";
import AnalyticsTotalRevenue from "@/components/metrics/analytics-total-revenue";
import AnalyticsSubscribersCard from "@/components/metrics/analytics-subscribers-card";
import AnalyticsSubscribersCountriesCard from "@/components/metrics/analytics-subscribers-countries-card";
import AnalyticsOrdersCard from "@/components/metrics/analytics-orders-card";
import AnalyticsOrdersCountriesCard from "@/components/metrics/analytics-orders-countries-card";
import AnalyticsOrdersUsersCard from "@/components/metrics/analytics-orders-users-card";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function Analytics() {

  const { stage } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const defaultTab = "earnings";
  const currentTab = stage || defaultTab;

  if (!stage) {
    navigate(`/analytics/${defaultTab}`, { replace: true });
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid gap-2 grid-cols-2 md:gap-4 lg:grid-cols-5 lg:col-span-2">
        <Card>
          <CardHeader className="flex md:flex-row flex-col-reverse items-start md:items-end justify-between gap-1 p-3 md:p-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
            <CardTitle className="font-bold">
              $45,231
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex md:flex-row flex-col-reverse items-start md:items-end justify-between gap-1 p-3 md:p-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders
            </CardTitle>
            <CardTitle className="font-bold">
              573
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex md:flex-row flex-col-reverse items-start md:items-end justify-between gap-1 p-3 md:p-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sales
            </CardTitle>
            <CardTitle className="font-bold">
              733
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex md:flex-row flex-col-reverse items-start md:items-end justify-between gap-1 p-3 md:p-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Subscriptions
            </CardTitle>
            <CardTitle className="font-bold">
              3 921
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex md:flex-row flex-col-reverse items-start md:items-end justify-between gap-1 p-3 md:p-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Views
            </CardTitle>
            <CardTitle className="font-bold">
              280K
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Tabs defaultValue={currentTab} onValueChange={(value) => {
        navigate(`/analytics/${value}`)
      }}>
        <TabsList>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <div className="flex flex-col md:grid lg:grid-cols-5 gap-4 md:gap-6">
          <div className="lg:col-span-3">
            <TabsContent value="earnings">
              <div className="grid gap-4">
                <AnalyticsTotalRevenue/>
                <AnalyticsTotalEarningsCard height={300}/>
              </div>
            </TabsContent>
            <TabsContent value="subscribers">
              <div className="grid gap-4">
                <AnalyticsSubscribersCard/>
                <div className="grid md:grid-cols-2 gap-4">
                  <AnalyticsSubscribersCountriesCard />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="orders">
              <div className="grid gap-4">
                <AnalyticsOrdersCard height={270}/>
                <div className="grid md:grid-cols-2 items-start gap-4">
                  <AnalyticsOrdersCountriesCard/>
                  <AnalyticsOrdersUsersCard/>
                </div>
              </div>
            </TabsContent>
          </div>
          <div className="lg:col-span-2">
            <AnalyticsProductsCard/>
          </div>
        </div>
      </Tabs>
    </main>
)
}

export default Analytics