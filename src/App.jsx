"use client"
import "./App.css"
import { PostcodeStep } from "./pages/PostcodeStep.jsx"
import { WasteTypeStep } from "./pages/WasteTypeStep.jsx"
import { SkipSelectionStep } from "./pages/SkipSelectionStep.jsx"
import { AppStateProvider, useAppState } from "./context/AppStateContext.jsx"

const AppContent = () => {
  const { state, actions } = useAppState()
  const { currentStep } = state

  const handlePostcodeSubmit = (data) => {
    actions.updateFormData(data)
    actions.setStep(2)
  }

  const handleWasteTypeSubmit = (wasteTypes) => {
    actions.setWasteTypes(wasteTypes)
    actions.setStep(3)
  }

  const handleSkipSubmit = (skip) => {
    actions.setSelectedSkip(skip)
    actions.setStep(4)
    alert(`Selected skip: ${skip.name} - £${skip.price}`)
  }

  const handleBackClick = (stepId) => {
    actions.setStep(stepId || currentStep - 1)
  }

  return (
    <div className="app">
      {currentStep === 1 && <PostcodeStep onSubmit={handlePostcodeSubmit} initialData={state.formData} />}
      {currentStep === 2 && (<WasteTypeStep onBackClick={() => handleBackClick(1)} onContinue={handleWasteTypeSubmit} initialData={state.wasteTypes} />)}
      {currentStep === 3 && (<SkipSelectionStep onBackClick={handleBackClick} onContinue={handleSkipSubmit} formData={state.formData} initialSelectedSkip={state.selectedSkip} />)}
    </div>
  )
}

export const App = () => {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  )
}

export default App

