import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import foodImg from '../assets/foodr.png'
import { LiaStopwatchSolid } from "react-icons/lia";
import { GiNestedHearts } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin3Fill } from "react-icons/ri";

import api from '../api';

export default function RecipeItems() {
    const recipes = useLoaderData()
    const [allRecipes, setAllRecipes] = useState()
    let path = window.location.pathname === "/myRecipe" ? true : false
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavRecipe, setIsFavRecipe] = useState(false)
    const navigate=useNavigate()
    console.log(allRecipes)

    useEffect(() => {
        setAllRecipes(recipes)
    }, [recipes])

    const onDelete = async (id) => {
        try {
            await api.delete(`/recipe/${id}`)
            setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id))
            let filterItem = favItems.filter(recipe => recipe._id !== id)
            localStorage.setItem("fav", JSON.stringify(filterItem))
        } catch (err) {
            console.error("Error deleting recipe:", err.response?.data)
        }
    }

    const favRecipe = (item) => {
        let filterItem = favItems.filter(recipe => recipe._id !== item._id)
        favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 ? [...favItems, item] : filterItem
        localStorage.setItem("fav", JSON.stringify(favItems))
        setIsFavRecipe(pre => !pre)
    }

    return (
        <>
            <div className='card-container'>
                {
                    allRecipes?.map((item, index) => {
                        return (
                            <div key={index} className='card' onDoubleClick={()=>navigate(`/recipe/${item._id}`)}>
                                <img src={item.coverImage ? (item.coverImage.startsWith('http') ? item.coverImage : `${api.defaults.baseURL}/images/${item.coverImage}`) : foodImg} alt={item.title} width="120px" height="100px"></img>
                                <div className='card-body'>
                                    <div className='title'>{item.title}</div>
                                    <div className='icons'>
                                        <div className='timer'><LiaStopwatchSolid />{item.time}</div>
                                        {(!path) ? <GiNestedHearts onClick={() => favRecipe(item)}
                                            style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "" }} /> :
                                            <div className='action'>
                                                <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                                <RiDeleteBin3Fill onClick={() => onDelete(item._id)} className='deleteIcon' />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}