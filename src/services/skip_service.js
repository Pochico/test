const API_BASE_URL = "https://app.wewantwaste.co.uk/api"

export const fetchSkipsByLocation = async ( area) => {
  try {
    const response = await fetch(`${API_BASE_URL}/skips/by-location?postcode=NR32&area=${area}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching skips:", error)
    return getMockSkipData()
  }
}

const getMockSkipData = () => {
  return {
    skips: [
      {
        id: 1,
        name: "4 Yard Skip",
        size: 4,
        price: 216,
        period: 14,
        description: "Ideal for small home projects",
        imageUrl: "/placeholder.svg?height=200&width=400",
      },
      {
        id: 2,
        name: "5 Yard Skip",
        size: 5,
        price: 260,
        period: 14,
        description: "Perfect for medium-sized clearance",
        imageUrl: "/placeholder.svg?height=200&width=400",
      },
      {
        id: 3,
        name: "6 Yard Skip",
        size: 6,
        price: 296,
        period: 14,
        description: "Good for larger home renovations",
        imageUrl: "/placeholder.svg?height=200&width=400",
      },
      {
        id: 4,
        name: "8 Yard Skip",
        size: 8,
        price: 340,
        period: 14,
        description: "Suitable for major home renovations",
        imageUrl: "/placeholder.svg?height=200&width=400",
      },
      {
        id: 5,
        name: "10 Yard Skip",
        size: 10,
        price: 390,
        period: 14,
        description: "For large construction projects",
        imageUrl: "/placeholder.svg?height=200&width=400",
      },
      {
        id: 6,
        name: "12 Yard Skip",
        size: 12,
        price: 450,
        period: 14,
        description: "Our largest skip for major projects",
        imageUrl: "/placeholder.svg?height=200&width=400",
      },
    ],
  }
}

