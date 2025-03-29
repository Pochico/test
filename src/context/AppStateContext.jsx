"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const initialState = {
    currentStep: 1,
    formData: {
        postcode: "",
        city: "",
        streetName: "",
        houseNumber: "",
    },
    wasteTypes: {
        general: [],
        heavy: [],
    },
    selectedSkip: null,
}

const ActionTypes = {
    SET_STEP: "SET_STEP",
    UPDATE_FORM_DATA: "UPDATE_FORM_DATA",
    SET_WASTE_TYPES: "SET_WASTE_TYPES",
    SET_SELECTED_SKIP: "SET_SELECTED_SKIP",
    RESET_STATE: "RESET_STATE",
}

const appReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_STEP:
            return {
                ...state,
                currentStep: action.payload,
            }
        case ActionTypes.UPDATE_FORM_DATA:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    ...action.payload,
                },
            }
        case ActionTypes.SET_WASTE_TYPES:
            return {
                ...state,
                wasteTypes: action.payload,
            }
        case ActionTypes.SET_SELECTED_SKIP:
            return {
                ...state,
                selectedSkip: action.payload,
            }
        case ActionTypes.RESET_STATE:
            return initialState
        default:
            return state
    }
}

// Crear el contexto
const AppStateContext = createContext()

// Crear un hook personalizado para usar el contexto
export const useAppState = () => {
    const context = useContext(AppStateContext)
    if (!context) {
        throw new Error("useAppState must be used within an AppStateProvider")
    }
    return context
}

// Crear el proveedor del contexto
export const AppStateProvider = ({ children }) => {
    // Intentar cargar el estado desde localStorage
    const loadState = () => {
        try {
            const savedState = localStorage.getItem("wasteAppState")
            return savedState ? JSON.parse(savedState) : initialState
        } catch (error) {
            console.error("Error loading state from localStorage:", error)
            return initialState
        }
    }

    const [state, dispatch] = useReducer(appReducer, loadState())

    useEffect(() => {
        try {
            localStorage.setItem("wasteAppState", JSON.stringify(state))
        } catch (error) {
            console.error("Error saving state to localStorage:", error)
        }
    }, [state])

    const actions = {
        setStep: (step) => dispatch({ type: ActionTypes.SET_STEP, payload: step }),
        updateFormData: (data) => dispatch({ type: ActionTypes.UPDATE_FORM_DATA, payload: data }),
        setWasteTypes: (types) => dispatch({ type: ActionTypes.SET_WASTE_TYPES, payload: types }),
        setSelectedSkip: (skip) => dispatch({ type: ActionTypes.SET_SELECTED_SKIP, payload: skip }),
        resetState: () => dispatch({ type: ActionTypes.RESET_STATE }),
    }

    return <AppStateContext.Provider value={{ state, actions }}>{children}</AppStateContext.Provider>
}

