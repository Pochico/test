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
    skipPlacement: {
        locationType: "",
        requiresPermit: false,
        permitCost: 0,
        photo: null,
    },
    deliveryDate: null,
    payment: {
        total: 0,
        permitFee: 0,
        completed: false,
    },
}

const ActionTypes = {
    SET_STEP: "SET_STEP",
    UPDATE_FORM_DATA: "UPDATE_FORM_DATA",
    SET_WASTE_TYPES: "SET_WASTE_TYPES",
    SET_SELECTED_SKIP: "SET_SELECTED_SKIP",
    SET_SKIP_PLACEMENT: "SET_SKIP_PLACEMENT",
    SET_PLACEMENT_PHOTO: "SET_PLACEMENT_PHOTO",
    SET_DELIVERY_DATE: "SET_DELIVERY_DATE",
    UPDATE_PAYMENT: "UPDATE_PAYMENT",
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
        case ActionTypes.SET_SKIP_PLACEMENT:
            return {
                ...state,
                skipPlacement: {
                    ...state.skipPlacement,
                    ...action.payload,
                },
            }
        case ActionTypes.SET_PLACEMENT_PHOTO:
            return {
                ...state,
                skipPlacement: {
                    ...state.skipPlacement,
                    photo: action.payload,
                },
            }
        case ActionTypes.SET_DELIVERY_DATE:
            return {
                ...state,
                deliveryDate: action.payload,
            }
        case ActionTypes.UPDATE_PAYMENT:
            return {
                ...state,
                payment: {
                    ...state.payment,
                    ...action.payload,
                },
            }
        case ActionTypes.RESET_STATE:
            return initialState
        default:
            return state
    }
}

const AppStateContext = createContext()

export const useAppState = () => {
    const context = useContext(AppStateContext)
    if (!context) {
        throw new Error("useAppState must be used within an AppStateProvider")
    }
    return context
}

export const AppStateProvider = ({ children }) => {
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
        setSkipPlacement: (placement) => dispatch({ type: ActionTypes.SET_SKIP_PLACEMENT, payload: placement }),
        setPlacementPhoto: (photo) => dispatch({ type: ActionTypes.SET_PLACEMENT_PHOTO, payload: photo }),
        setDeliveryDate: (date) => dispatch({ type: ActionTypes.SET_DELIVERY_DATE, payload: date }),
        updatePayment: (payment) => dispatch({ type: ActionTypes.UPDATE_PAYMENT, payload: payment }),
        resetState: () => dispatch({ type: ActionTypes.RESET_STATE }),
    }

    return <AppStateContext.Provider value={{ state, actions }}>{children}</AppStateContext.Provider>
}

