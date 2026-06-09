'use client';

import { useState } from 'react';

type BookingData = {
  service: string;
  name: string;
  phone: string;
  email: string;
};

export default function BookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [data, setData] = useState<BookingData>({
    service: '',
    name: '',
    phone: '',
    email: '',
  });

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(0);
      setData({ service: '', name: '', phone: '', email: '' });
      setSubmitError('');
      setIsSubmitting(false);
    }, 500);
  };

  const isStepValid = () => {
    if (currentStep === 0) return data.service !== '';
    if (currentStep === 1) return data.name !== '' && data.phone.length >= 8 && data.email.includes('@');
    return true;
  };

  const submitBooking = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setSubmitError(result.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Success — move to confirmation step
      setCurrentStep(2);
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (!isStepValid()) return;

    if (currentStep === 1) {
      // Last input step — submit to API
      submitBooking();
    } else if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setSubmitError('');
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / 2) * 100;

  return (
    <div
      className={`booking-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains('booking-overlay')) {
          handleClose();
        }
      }}
    >
      <div className="booking-modal">
        <button className="close-modal" onClick={handleClose}>
          &times;
        </button>

        {currentStep < 2 && (
          <div className="modal-header">
            <h2>Request Consultation</h2>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress > 100 ? 100 : progress}%` }}></div>
            </div>
          </div>
        )}

        <div className="modal-body">
          {/* Step 1 */}
          <div className={`booking-step ${currentStep === 0 ? 'active' : ''}`} style={{ display: currentStep === 0 ? 'block' : 'none' }}>
            <p className="step-desc">What is the primary focus of your visit?</p>
            <div className="service-selection">
              {['Cosmetic Veneers', 'Invisalign Therapy', 'Ceramic Crowns', 'Complete Makeover', 'Routine Check-up', 'Other Consultation'].map((srv) => (
                <div
                  key={srv}
                  className={`service-box ${data.service === srv ? 'selected' : ''}`}
                  onClick={() => setData({ ...data, service: srv })}
                >
                  {srv === 'Complete Makeover' ? 'Smile Makeover' : srv}
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className={`booking-step ${currentStep === 1 ? 'active' : ''}`} style={{ display: currentStep === 1 ? 'block' : 'none' }}>
            <p className="step-desc">Please provide your details so our concierge can reach out.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-field">
                <input
                  type="text"
                  id="patientName"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  required
                />
                <label htmlFor="patientName">Full Name</label>
              </div>
              <div className="input-field">
                <input
                  type="tel"
                  id="patientPhone"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  required
                />
                <label htmlFor="patientPhone">Phone Number</label>
              </div>
              <div className="input-field">
                <input
                  type="email"
                  id="patientEmail"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
                <label htmlFor="patientEmail">Email Address</label>
              </div>
            </form>
            {submitError && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                border: '1px solid rgba(220, 53, 69, 0.3)',
                borderRadius: '8px',
                color: '#dc3545',
                fontSize: '0.9rem',
              }}>
                {submitError}
              </div>
            )}
          </div>

          {/* Step 3 (Success) */}
          <div className={`booking-step success-step ${currentStep === 2 ? 'active' : ''}`} style={{ display: currentStep === 2 ? 'block' : 'none' }}>
            <div className="success-icon">
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
              </svg>
            </div>
            <h3>Request Sent</h3>
            <p>
              Thank you, <strong style={{ color: 'var(--charcoal)' }}>{data.name}</strong>. Your consultation request has been securely submitted.
            </p>
            <div className="success-details">
              <div>Treatment Focus: <strong>{data.service}</strong></div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#888' }}>
              Our medical concierge will contact you shortly to schedule your appointment time.
            </p>
            <button className="btn btn-gold" onClick={handleClose} style={{ marginTop: '1rem', width: '100%' }}>
              Return to Website
            </button>
          </div>
        </div>

        {currentStep < 2 && (
          <div className="modal-footer-btns">
            <button
              className="btn btn-ghost"
              onClick={prevStep}
              style={{ visibility: currentStep > 0 ? 'visible' : 'hidden' }}
            >
              Back
            </button>
            <button
              className="btn btn-gold"
              onClick={nextStep}
              disabled={!isStepValid() || isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Submitting...' : currentStep === 1 ? 'Confirm Request' : 'Continue'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
