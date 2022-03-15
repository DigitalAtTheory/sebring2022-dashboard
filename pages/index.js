import { useState, useEffect } from "react";
import {
  mintRef,
  truckRef,
  corralRef,
  platzRef,
  corvetteRef,
  porscheRef,
  lexusRef,
} from "../firebase/db";
import { getDocs, onSnapshot } from "firebase/firestore";

import StatCard from "../components/StatCard";

export async function getServerSideProps(context) {
  const mintData = await getData(mintRef);
  const truckData = await getData(truckRef);
  const corralData = await getData(corralRef);
  const platzData = await getData(platzRef);
  const corvetteData = await getData(corvetteRef);
  const porscheData = await getData(porscheRef);
  const lexusData = await getData(lexusRef);

  async function getData(ref) {
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => doc.data());

    return data;
  }

  return {
    props: {
      mintData,
      truckData,
      corralData,
      platzData,
      corvetteData,
      porscheData,
      lexusData,
    },
  };
}

export default function Home({
  mintData,
  truckData,
  corralData,
  platzData,
  corvetteData,
  porscheData,
  lexusData,
}) {
  const [mintEntries, setMintEntries] = useState(mintData);
  const [truckEntries, setTruckEntries] = useState(truckData);
  const [corralEntries, setCorralEntries] = useState(corralData);
  const [platzEntries, setPlatzEntries] = useState(platzData);
  const [corvetteEntries, setCorvetteEntries] = useState(corvetteData);
  const [porscheEntries, setPorscheEntries] = useState(porscheData);
  const [lexusEntries, setLexusEntries] = useState(lexusData);

  useEffect(() => {
    const mintUnsub = onSnapshot(mintRef, (querySnapshot) => {
      setMintEntries(querySnapshot.docs.map((doc) => doc.data()));
    });
    const truckUnsub = onSnapshot(truckRef, (querySnapshot) => {
      setTruckEntries(querySnapshot.docs.map((doc) => doc.data()));
    });
    const corralUnsub = onSnapshot(corralRef, (querySnapshot) => {
      setCorralEntries(querySnapshot.docs.map((doc) => doc.data()));
    });
    const platzUnsub = onSnapshot(platzRef, (querySnapshot) => {
      setPlatzEntries(querySnapshot.docs.map((doc) => doc.data()));
    });
    const corvetteUnsub = onSnapshot(corvetteRef, (querySnapshot) => {
      setCorvetteEntries(querySnapshot.docs.map((doc) => doc.data()));
    });
    const porscheUnsub = onSnapshot(porscheRef, (querySnapshot) => {
      setPorscheEntries(querySnapshot.docs.map((doc) => doc.data()));
    });
    const lexusUnsub = onSnapshot(lexusRef, (querySnapshot) => {
      setLexusEntries(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      mintUnsub();
      truckUnsub();
      corralUnsub();
      platzUnsub();
      corvetteUnsub();
      porscheUnsub();
      lexusUnsub();
    };
  }, []);

  return (
    <>
      <div className="bg-black text-gray-50 text-center py-12 mb-12 border-b-8 border-gold-500">
        <h1 className="font-black text-5xl">Sebring 2022</h1>
      </div>
      <div className="max-w-5xl px-4 mx-auto">
        <div className="mb-12 md:mb-0">
          <h2 className="font-bold uppercase bg-red-100 max-w-max px-2 rounded-full text-red-700 mb-4">
            Virtual Car Corrals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8  md:gap-12">
            <StatCard
              letter="C"
              title="Corvette"
              numberOfEntries={corvetteEntries.length}
            />
            <StatCard
              letter="P"
              title="Porsche"
              numberOfEntries={porscheEntries.length}
            />
            <StatCard
              letter="L"
              title="Lexus"
              numberOfEntries={lexusEntries.length}
            />
          </div>
        </div>
        <div className="mb-12 md:mb-0">
          <h2 className="font-bold uppercase bg-blue-100 max-w-max px-2 rounded-full text-blue-700 mb-4">
            On-site Car Corrals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8  md:gap-12">
            <StatCard
              letter="C"
              title="Corvette Corral"
              numberOfEntries={corralEntries.length}
            />
            <StatCard
              letter="P"
              title="Porsche Platz"
              numberOfEntries={platzEntries.length}
            />
          </div>
        </div>
        <div className="mb-12 md:mb-0">
          <h2 className="font-bold uppercase bg-emerald-100 max-w-max px-2 rounded-full text-emerald-700 mb-4">
            Other Surveys
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8  md:gap-12">
            <StatCard
              letter="T"
              title="Truck Corral"
              numberOfEntries={truckEntries.length}
            />
            <StatCard
              letter="M"
              title="Mint 400"
              numberOfEntries={mintEntries.length}
            />
          </div>
        </div>
      </div>
    </>
  );
}
