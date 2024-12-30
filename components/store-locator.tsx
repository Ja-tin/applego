"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Star } from 'lucide-react'
import { indianStores } from "@/lib/stores"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function StoreLocator() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const states = Array.from(new Set(indianStores.map(store => store.state)))
  const cities = Array.from(
    new Set(
      indianStores
        .filter(store => !selectedState || store.state === selectedState)
        .map(store => store.city)
    )
  )

  const filteredStores = indianStores.filter(store => 
    (selectedState === "all" || store.state === selectedState) &&
    (selectedCity === "all" || store.city === selectedCity)
  )

  const handleStoreClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card className="bg-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Store Locator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select State</label>
            <Select
              value={selectedState || "all"}
              onValueChange={(value) => {
                setSelectedState(value)
                setSelectedCity(null)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select City</label>
            <Select
              value={selectedCity || "all"}
              onValueChange={(value) => setSelectedCity(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          {filteredStores.map((store) => (
            <Card key={store.id} className="hover:bg-accent transition-colors">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{store.name}</h3>
                      <p className="text-sm text-muted-foreground">{store.address}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleStoreClick(store.mapUrl)}
                      className="shrink-0"
                    >
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="ml-1 text-sm">{store.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{store.city}, {store.state}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

