/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Phone } from 'lucide-react'
import { useState } from 'react'
import { createRentalRequest } from '../../_action/create-rental-request'

interface RentalRequestProps {
  propertyId?: string
  tenantId?: string | null
  isLoading?: boolean
}

export default function RentalRequest({ 
  propertyId, 
  tenantId, 
  isLoading = false 
}: RentalRequestProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [numberOfGuests, setNumberOfGuests] = useState("1")

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    if (!tenantId) {
      setErrorMessage("You must be logged in as a tenant to submit a request.")
      setLoading(false)
      return
    }

    if (!propertyId) {
      setErrorMessage("Property information is missing.")
      setLoading(false)
      return
    }

    try {
      // Create FormData for the server action
      const formData = new FormData()
      formData.append('propertyId', propertyId)
      formData.append('tenantId', tenantId)
      formData.append('message', message.trim() || "No additional message provided.")
      formData.append('numberOfGuests', numberOfGuests)

      // console.log("Submitting rental request via server action...")

      // Call the server action
      const result = await createRentalRequest(formData)

      // console.log("Server action result:", result)

      if (result.success) {
        setSuccessMessage("Rental request successfully sent!")
        
        setTimeout(() => {
          setIsOpen(false)
          setSuccessMessage(null)
          setMessage("")
          setNumberOfGuests("1")
        }, 2000)
      } else {
        setErrorMessage(result.message || "Failed to submit rental request")
      }
    } catch (error: any) {
    //   console.error("Failed to submit rental request:", error)
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full gap-2" 
          size="lg"
          disabled={isLoading || !tenantId}
          title={!tenantId ? "Please log in as a tenant to request" : ""}
        >
          <Phone className="w-4 h-4" /> 
          {isLoading ? "Loading..." : "Request For Rent"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmitRequest}>
          <DialogHeader>
            <DialogTitle>Request Rental Property</DialogTitle>
            <DialogDescription>
              Fill out the details below to send a booking application to the landlord.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {errorMessage && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {errorMessage}
              </div>
            )}
            
            {successMessage && (
              <div className="bg-emerald-500/10 text-emerald-600 text-sm p-3 rounded-md font-medium">
                {successMessage}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="numberOfGuests">Number of Guests</Label>
              <Input
                id="numberOfGuests"
                type="number"
                min="1"
                max="10"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message to Landlord</Label>
              <Textarea
                id="message"
                placeholder="Introduce yourself or write any specific query..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                disabled={loading}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {message.length}/500
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}