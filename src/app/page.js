"use client"

import { useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getOpenRequests } from "@/services/Web3Service";
import Request from "@/components/Request";

export default function Home() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests(0);
  }, [])

  async function loadRequests(lastId) {
    try {
      const result = await getOpenRequests(lastId);
      if (lastId === 0)
        setRequests(result);
      else {
        requests.push(...result);
        setRequests(requests);
      }
    }
    catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row ps-5">
          <p className="lead m-4">Apoie o projeto de desenvolvimento de uma plataforma de crowdfunding para o Brasil. O projeto é uma plataforma de crowdfunding para o Brasil que visa ajudar pessoas a encontrarem oportunidades de emprego e empreendedorismo do Brasil.</p>
        </div>
        <div className="p-4 mx-5">
          <div className="list-group">
            {
              requests && requests.length
                ? requests.map(rq => <Request key={rq.id} data={rq} />)
                : <>Conect sua carteira MetaMask no botão "Entrar" para ajudar ou pedir ajuda.</>
            }
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}