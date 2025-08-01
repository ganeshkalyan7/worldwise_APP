import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PriceingPage from "./pages/PriceingPage";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Applayout from "./pages/Applayout";
import CitiesList from "./components/CitiesList";
import Countries from "./components/Countries";
import { useEffect, useState } from "react";
import CitiDetails from "./components/CitiDetails";
import Form from "./components/Form";
import CitiesContext from "../contexts/CitiesContext";
import UserAuthContext from "../contexts/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <div>
        <UserAuthContext>
          <CitiesContext>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/price" element={<PriceingPage />} />
                <Route path="/product" element={<Product />} />

                <Route path="/Login" element={<Login />} />

                {/* nested Routes */}
                <Route
                  path="/Applayout"
                  element={
                    <ProtectedRoute>
                      <Applayout />
                    </ProtectedRoute>
                  }
                >
                  {/* <Route index element={<CitiesList />} /> */}
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CitiesList />} />
                  <Route path="cities/:id" element={<CitiDetails />} />
                  <Route path="countries" element={<Countries />} />
                  <Route path="form" element={<Form />} />
                </Route>
                {/* nested Routes */}
              </Routes>
            </BrowserRouter>
          </CitiesContext>
        </UserAuthContext>
      </div>
    </>
  );
}

export default App;
