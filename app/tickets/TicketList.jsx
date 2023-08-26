import React from 'react'
import Link from "next/link"

async function getTickets() {
    // fetch data
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        next: {
            revalidate: 0 // never cache
        }
    });
    return res.json();
}

export default async function TicketList() {
    const tickets = await getTickets()
  
    return (
        <>
          {tickets.map((ticket) => (
            <div key={ticket.id} className="card my-5">
              <Link href={`/tickets/${ticket.id.toString()}`}>
                <h3>{ticket.name}</h3>
                {/* <p>{ticket.body.slice(0, 200)}...</p> */}
                {/* <div className={`pill ${ticket.priority}`}>
                  {ticket.priority} priority
                </div> */}
              </Link>
            </div>
          ))}
          {tickets.length === 0 && (
            <p className="text-center">There are no open tickets, yay!</p>
          )}
        </>
      )
    }