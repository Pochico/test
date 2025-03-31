
import "./App.css"
import { PostcodeStep } from "./pages/PostcodeStep"
import { WasteTypeStep } from "./pages/WasteTypeStep"
import { SkipSelectionStep } from "./pages/SkipSelectionStep"
import { PermitCheckStep } from "./pages/PermitCheckStep"
import { ChooseDateStep } from "./pages/ChooseDateStep"
import { PaymentStep } from "./pages/PaymentStep"
import { Breadcrumbs } from "./components/Breadcrumbs"
import { AppStateProvider, useAppState } from "./context/AppStateContext"

const AppContent = () => {
  const { state, actions } = useAppState()
  const { currentStep } = state

  const handleStepClick = (stepId) => {
    if (stepId < currentStep) {
      actions.setStep(stepId)
    }
  }

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
  }

  const handlePermitSubmit = (placement) => {
    actions.setSkipPlacement(placement)
    actions.setStep(5)
  }

  const handleDateSubmit = (date) => {
    actions.setDeliveryDate(date)
    actions.setStep(6)
  }

  const handlePaymentSubmit = (payment) => {
    actions.updatePayment(payment)
    alert("¡Pago completado! Gracias por tu pedido.")
  }

  const handleBackClick = (stepId) => {
    actions.setStep(stepId || currentStep - 1)
  }

  return (
    <div className="app">
      <Breadcrumbs currentStep={currentStep} onStepClick={handleStepClick} />

      {currentStep === 1 && <PostcodeStep onSubmit={handlePostcodeSubmit} initialData={state.formData} />}
      {currentStep === 2 && (
        <WasteTypeStep
          onBackClick={() => handleBackClick(1)}
          onContinue={handleWasteTypeSubmit}
          initialData={state.wasteTypes}
        />
      )}
      {currentStep === 3 && (
        <SkipSelectionStep
          onBackClick={handleBackClick}
          onContinue={handleSkipSubmit}
          formData={state.formData}
          initialSelectedSkip={state.selectedSkip}
        />
      )}
      {currentStep === 4 && (
        <PermitCheckStep
          onBackClick={handleBackClick}
          onContinue={handlePermitSubmit}
          initialData={state.skipPlacement}
        />
      )}
      {currentStep === 5 && (
        <ChooseDateStep
          onBackClick={handleBackClick}
          onContinue={handleDateSubmit}
          initialDate={state.deliveryDate}
          requiresPermit={state.skipPlacement.requiresPermit}
        />
      )}
      {currentStep === 6 && (
        <PaymentStep
          onBackClick={handleBackClick}
          onContinue={handlePaymentSubmit}
          skipData={state.selectedSkip}
          permitData={state.skipPlacement}
          deliveryDate={state.deliveryDate}
        />
      )}
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

