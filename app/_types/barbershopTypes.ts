export interface BarbershopPageProps {
  params: {
    id: string
  }
}

export interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}
