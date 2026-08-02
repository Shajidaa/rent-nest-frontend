/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import RentalRequest from './rental-request'
import { getMe } from '@/service/getMe'
import { PropertyLandLordProps } from '@/lib/type'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'



export function PropertyLandLord(property: PropertyLandLordProps) {
  const [tenantId, setTenantId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true)
        const response = await getMe()
        
      
        
        // Extract user ID from the response structure
        const userId = response?.data?.profile?.id || 
                      response?.data?.id || 
                      response?.id
        
        if (userId) {
          setTenantId(userId)
          // console.log("Tenant ID set:", userId)
        } else {
          // console.log("No user ID found")
          setTenantId(null)
        }
      } catch (err) {
        // console.error("Failed to fetch user session:", err)
        setTenantId(null)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchUser()
  }, [])

  return (
    <div className="space-y-6">
      <Card className="sticky top-6 border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Hosted By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-base">
                {property?.user?.name || "Unknown Host"}
              </h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {property?.user?.email || "No email provided"}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm pt-2 border-t">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 text-primary" />
              <span>Contact via portal</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {
  tenantId ?  <RentalRequest 
              propertyId={property.id} 
              tenantId={tenantId}
              isLoading={isLoading}
            />:  <Button 
          className="w-full gap-2" 
          size="lg"
       
          onClick={() => {
            toast.error("Please log in to request for rent.")
          }}
        >
          <Phone className="w-4 h-4" /> 
         Request For Rent
        </Button>
}
           
          </div>
        </CardContent>
      </Card>
    </div>
  )
}