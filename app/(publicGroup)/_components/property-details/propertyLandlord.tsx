import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, User } from 'lucide-react'


export default function PropertyLandLord({...property}) {
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
                  <h3 className="font-semibold text-base">{property.user.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{property.user.email}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm pt-2 border-t">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{ "Contact via portal"}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button className="w-full gap-2" size="lg">
                  <Phone className="w-4 h-4" /> Request For Rent
                </Button>
               
              </div>
            </CardContent>
          </Card>
        </div>

  )
}
