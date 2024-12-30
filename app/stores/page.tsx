"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Navigation, Star, Search } from 'lucide-react'
import { indianStores } from "@/lib/stores"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function StoresPage() {
  const [selectedState, setSelectedState] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const states = Array.from(new Set(indianStores.map(store => store.state)))

  const filteredStores = indianStores.filter(store => {
    const matchesState = selectedState === "all" || store.state === selectedState
    const matchesSearch = 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesState && matchesSearch
  })

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MapPin className="h-8 w-8 text-primary" />
            Apple Store Locations
          </h1>
          <p className="text-muted-foreground">
            Find Apple authorized resellers across India
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by store name, city or address..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={selectedState}
            onValueChange={setSelectedState}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select State" />
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStores.map((store) => (
            <Card key={store.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{store.name}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="ml-1 text-sm">{store.rating}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{store.address}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{store.city}, {store.state}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(store.mapUrl, '_blank')}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

