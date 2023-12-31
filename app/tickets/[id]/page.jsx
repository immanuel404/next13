import React from 'react'
import { notFound } from "next/navigation"
export const dynamicParams = true // default val = true

export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const tickets = await res.json()
 
  return tickets.map((ticket) => ({
    id: ticket.id.toString()
  }))
}

async function getTicket(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    next: {
      revalidate: 60 // every 60s
    }
  })

  if (!res.ok) {
    notFound()
  }

  return res.json()
}


export default async function TicketDetails({ params }) {
  // const id = params.id
  const ticket = await getTicket(params.id.toString())

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.name}</h3>
        {/* <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p> */}
        {/* <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div> */}
      </div>
    </main>
  )
}