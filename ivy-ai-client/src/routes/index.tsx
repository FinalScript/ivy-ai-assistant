import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [isAnnual, setIsAnnual] = useState(true);
  const annualDiscount = 0.44;

  const prices = {
    pro: {
      monthly: 15,
      annual: 15 * (1 - annualDiscount) * 12
    },
    academic: {
      monthly: 30,
      annual: 30 * (1 - annualDiscount) * 12
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">

            <h1 className="text-5xl font-bold">Your AI Study Assistant</h1>
            
            <p className="py-6 text-lg">
              Let Ivy AI organize your academic life. Upload your course schedules and syllabi, 
              and get an instantly organized calendar for your entire term - synced across all your devices.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth" className="btn btn-primary">Get Started</Link>
              <Link to="/" className="btn btn-outline">See Demo</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Smart Student Organization</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 mask mask-squircle bg-primary flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="card-title">Multiple Calendar Views</h3>
                <p>Switch between month, week, and day views to plan your academic schedule effectively</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 mask mask-squircle bg-primary flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="card-title">Seamless Sync</h3>
                <p>Automatically sync with Google Calendar, Apple Calendar, and other popular platforms</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 mask mask-squircle bg-primary flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="card-title">AI-Powered Organization</h3>
                <p>Smart parsing of syllabi and course schedules to automatically create your term calendar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-base-200 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">How It Works</h3>
                <ul className="steps steps-vertical">
                  <li className="step step-primary">Upload your course schedules</li>
                  <li className="step step-primary">AI processes your documents</li>
                  <li className="step step-primary">Review your organized calendar</li>
                  <li className="step step-primary">Sync with your preferred calendar app</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Stay Organized All Term</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="badge badge-primary badge-lg">✓</div>
                  <p>Never miss assignment deadlines or exam dates</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="badge badge-primary badge-lg">✓</div>
                  <p>Get smart reminders for upcoming tasks</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="badge badge-primary badge-lg">✓</div>
                  <p>View conflicts and overlaps at a glance</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="badge badge-primary badge-lg">✓</div>
                  <p>Access your schedule from any device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Choose the plan that best fits your needs. All plans include core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Free Tier */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl">Free</h3>
                <div className="my-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-base-content/60">/forever</span>
                </div>
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Up to 4 courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Track all classes, assignments & exams</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Basic AI scheduling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Calendar sync</span>
                  </div>
                </div>
                <div className="card-actions mt-6">
                  <Link to="/auth" className="btn btn-outline btn-block">Get Started</Link>
                </div>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="card bg-base-100 shadow-xl border-2 border-primary relative">
              <div className="absolute -top-3 right-4">
                <div className="badge badge-primary">RECOMMENDED</div>
              </div>
              <div className="card-body">
                <h3 className="card-title text-2xl">Pro</h3>
                {/* Pro Tier price display */}
                <div className="my-4 flex items-center justify-between">
                  <div>
                    <span className="text-4xl font-bold">${isAnnual ? Math.round(prices.pro.annual / 12) : prices.pro.monthly}</span>
                    <span className="text-base-content/60">/month</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm">
                      <span className="line-through text-base-content/50">${prices.pro.monthly}</span>
                      <span className="text-success ml-2">Save ${(prices.pro.monthly - Math.round(prices.pro.annual / 12))}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Unlimited courses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Smart AI optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Deadline alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Schedule conflict detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Study time planning</span>
                  </div>
                </div>
                <div className="card-actions mt-6">
                  <Link to="/auth" className="btn btn-primary btn-block">Start Free Trial</Link>
                </div>
              </div>
            </div>

            {/* Academic Success Tier */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl">Academic Success</h3>
                {/* Academic Success Tier price display */}
                <div className="my-4 flex items-center justify-between">
                  <div>
                    <span className="text-4xl font-bold">${isAnnual ? Math.round(prices.academic.annual / 12) : prices.academic.monthly}</span>
                    <span className="text-base-content/60">/month</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm">
                      <span className="line-through text-base-content/50">${prices.academic.monthly}</span>
                      <span className="text-success ml-2">Save ${(prices.academic.monthly - Math.round(prices.academic.annual / 12))}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>All Pro features</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Smart study resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Performance tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Achievement system</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    <span>Study pattern analysis</span>
                  </div>
                </div>
                <div className="card-actions mt-6">
                  <Link to="/auth" className="btn btn-outline btn-block">Upgrade Now</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-4">
              <span>Monthly</span>
              <input 
                type="checkbox" 
                className="toggle toggle-primary" 
                checked={isAnnual}
                onChange={() => setIsAnnual(!isAnnual)}
              />
              <span>Annually (Save {annualDiscount * 100}%)</span>
            </div>
            <p className="text-sm text-base-content/70 mt-5">
              Save {annualDiscount * 100}% on all plans when billed annually!
            </p>
          </div>

          {/* FAQ Preview */}
          <div className="mt-16 text-center">
            <p className="text-base-content/60">
              Have questions? Check out our <Link to="/" className="link link-primary">FAQ</Link> or contact our support team.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Start Your Organized Semester Today</h2>
          <p className="mb-8">Join thousands of students who are mastering their academic schedules with Ivy AI.</p>
          <Link to="/auth" className="btn btn-primary btn-lg">Try Ivy Now - It's Free</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer p-10 bg-base-200 text-base-content">
        <div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="font-bold text-lg">Ivy AI</span>
          </div>
          <p className="max-w-xs mt-2">Making student life easier through intelligent schedule management and academic organization.</p>
        </div>

        <div>
          <span className="footer-title">Product</span>
          <Link to="/" className="link link-hover">Features</Link>
          <Link to="/" className="link link-hover">Pricing</Link>
          <Link to="/" className="link link-hover">Demo</Link>
          <Link to="/" className="link link-hover">Integrations</Link>
        </div>

        <div>
          <span className="footer-title">Support</span>
          <Link to="/" className="link link-hover">Help Center</Link>
          <Link to="/" className="link link-hover">Documentation</Link>
          <Link to="/" className="link link-hover">Contact Us</Link>
          <Link to="/" className="link link-hover">FAQ</Link>
        </div>

        <div>
          <span className="footer-title">Legal</span>
          <Link to="/" className="link link-hover">Terms of Service</Link>
          <Link to="/" className="link link-hover">Privacy Policy</Link>
          <Link to="/" className="link link-hover">Cookie Policy</Link>
        </div>

        <div>
          <span className="footer-title">Connect</span>
          <div className="grid grid-flow-col gap-4">
            <a className="hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a className="hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a className="hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
          <div className="mt-4">
            <span className="footer-title">Download App</span>
            <div className="flex gap-2 mt-2">
              <button className="btn btn-outline btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.66 4.23-3.74 4.25z"/>
                </svg>
                iOS
              </button>
              <button className="btn btn-outline btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523 15.334l2.038-3.534c.134-.233.334-.334.567-.334.2 0 .367.1.5.3.134.2.134.4.034.634l-2.038 3.534c-.1.233-.3.333-.534.333-.2 0-.367-.1-.5-.3-.133-.2-.133-.4-.067-.633zm-3.772-6.534l2.038-3.534c.134-.233.334-.333.567-.333.2 0 .366.1.5.3.133.2.133.4.033.634l-2.038 3.534c-.1.233-.3.334-.534.334-.2 0-.367-.1-.5-.3-.134-.2-.134-.4-.067-.633zm-3.771 6.534l2.038-3.534c.133-.233.333-.334.567-.334.2 0 .366.1.5.3.133.2.133.4.033.634l-2.038 3.534c-.1.233-.3.333-.534.333-.2 0-.367-.1-.5-.3-.133-.2-.133-.4-.066-.633zm-3.772-6.534l2.038-3.534c.134-.233.334-.333.567-.333.2 0 .367.1.5.3.134.2.134.4.034.633l-2.038 3.534c-.1.233-.3.334-.534.334-.2 0-.367-.1-.5-.3-.134-.2-.134-.4-.067-.634z"/>
                </svg>
                Android
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright Bar */}
      <footer className="footer footer-center p-4 bg-base-200 text-base-content border-t border-base-300">
        <div>
          <p className="text-base-content/60">Copyright © {new Date().getFullYear()} - All rights reserved by Ivy AI</p>
        </div>
      </footer>
    </div>
  )
}
