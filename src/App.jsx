import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import api from './api'

// Pages
import Home from './pages/Home'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails.jsx'

// Layout
import MainNavigation from './components/MainNavigation'


// 🔹 Load all recipes
const getAllRecipes = async () => {
  try {
    const res = await api.get('/recipe')
    return res.data
  } catch (err) {
    console.error("Error fetching recipes:", err)
    return []
  }
}

// 🔹 Load user's recipes
const getMyRecipe = async () => {
  try {
    let user = JSON.parse(localStorage.getItem("user"))
    if (!user) return []

    const allRecipes = await getAllRecipes()
    const userId = user.id || user._id

    return allRecipes.filter(item =>
      String(item.createdBy) === String(userId)
    )
  } catch (err) {
    console.error("getMyRecipe error:", err)
    return []
  }
}

// 🔹 Load favourite recipes
const getFavRecipes = () => {
  try {
    return JSON.parse(localStorage.getItem("fav")) || []
  } catch {
    return []
  }
}


// 🔹 Router Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: getAllRecipes
      },
      {
        path: "/myRecipe",
        element: <Home />,
        loader: getMyRecipe
      },
      {
        path: "/favRecipe",
        element: <Home />,
        loader: getFavRecipes
      },
      {
        path: "/addRecipe",
        element: <AddFoodRecipe />
      },
      {
        path: "/editRecipe/:id",
        element: <EditRecipe />
      },
      {
        path: "/recipe/:id",
        element: <RecipeDetails />   // ✅ FIXED ROUTE
      }
    ]
  }
])


// 🔹 App Component
export default function App() {
  return <RouterProvider router={router} />
}