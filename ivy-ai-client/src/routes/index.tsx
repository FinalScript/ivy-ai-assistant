import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Check, Calendar, BookOpen, Bot, Brain, Zap, Users, Star } from 'lucide-react'
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
      <div className="hero h-screen bg-base-200 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 top-1/4 -left-48 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 top-1/4 -right-48 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bottom-1/4 -left-48 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bottom-1/4 -right-48 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        </div>
        
        <div className="hero-content text-center z-10 w-full max-w-4xl px-4 mt-16 sm:mt-0">
          <div className="w-full">
            <div className="flex justify-center mb-6 animate-bounce-slow">
              <Bot className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
            </div>

            <h1 className="animate-fade-in">
              <span className="block text-5xl sm:text-6xl font-bold mb-2">Meet Ivy,</span>
              <span className="block text-2xl sm:text-4xl text-base-content/80">Your new AI Study Assistant</span>
            </h1>
            
            <p className="py-4 sm:py-6 text-base sm:text-xl animate-fade-in animation-delay-200 max-w-2xl mx-auto">
              Upload your syllabi once, and watch as your entire semester transforms 
              into a perfectly structured schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in animation-delay-400">
              <Link to="/auth" className="btn btn-primary btn-lg">Get Started</Link>
              <Link to="/" className="btn btn-outline btn-lg">See Demo</Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-8 rounded-full border-2 border-base-content/20 flex items-center justify-center">
            <div className="w-1 h-3 bg-base-content/20 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 px-4 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Smart Student Organization</h2>
          <p className="text-center text-base sm:text-lg text-base-content/70 mb-8 sm:mb-16 max-w-2xl mx-auto">
            Powerful features designed to make your academic life easier and more organized.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 mask mask-hexagon bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="card-title">Smart Calendar</h3>
                <p className="text-base-content/70">Intelligent scheduling that adapts to your learning style and preferences</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 mask mask-hexagon bg-secondary/10 flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="card-title">AI-Powered</h3>
                <p className="text-base-content/70">Advanced AI that understands your academic needs and optimizes your schedule</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 mask mask-hexagon bg-accent/10 flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h3 className="card-title">Instant Setup</h3>
                <p className="text-base-content/70">Upload your syllabi and get an organized schedule in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 sm:py-24 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What Students Say</h2>
          <p className="text-center text-base sm:text-lg text-base-content/70 mb-8 sm:mb-16 max-w-2xl mx-auto">
            Join thousands of students who have transformed their academic life with Ivy AI.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Testimonial 1 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 !flex !items-center !justify-center">
                      <span className="text-primary font-bold">JD</span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold truncate">John Doe</h3>
                    <p className="text-sm text-base-content/70 truncate">Computer Science Major</p>
                  </div>
                </div>
                <p className="text-base-content/70">"Ivy AI has completely transformed how I manage my coursework. The AI suggestions are incredibly helpful!"</p>
                <div className="flex gap-1 mt-4">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 !flex !items-center !justify-center">
                      <span className="text-secondary font-bold">AS</span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold truncate">Alice Smith</h3>
                    <p className="text-sm text-base-content/70 truncate">Biology Student</p>
                  </div>
                </div>
                <p className="text-base-content/70">"The automatic syllabus parsing saved me hours of manual calendar entry. Best academic tool I've used!"</p>
                <div className="flex gap-1 mt-4">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent/10 !flex !items-center !justify-center">
                      <span className="text-accent font-bold">MJ</span>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold truncate">Mike Johnson</h3>
                    <p className="text-sm text-base-content/70 truncate">Engineering Graduate</p>
                  </div>
                </div>
                <p className="text-base-content/70">"The smart reminders and conflict detection have saved me from missing important deadlines multiple times!"</p>
                <div className="flex gap-1 mt-4">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <Star className="w-4 h-4 text-warning fill-warning" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 sm:py-16 bg-base-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-figure text-primary">
                <Users className="w-8 h-8" />
              </div>
              <div className="stat-title">Active Users</div>
              <div className="stat-value">10K+</div>
              <div className="stat-desc">Students using Ivy AI</div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Brain className="w-8 h-8" />
              </div>
              <div className="stat-title">Study Hours</div>
              <div className="stat-value">1M+</div>
              <div className="stat-desc">Hours of study optimized</div>
            </div>
            
            <div className="stat">
              <div className="stat-figure text-accent">
                <Star className="w-8 h-8" />
              </div>
              <div className="stat-title">Satisfaction</div>
              <div className="stat-value">98%</div>
              <div className="stat-desc">Student satisfaction rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-base-200 py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
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
      <div className="py-16 sm:py-24 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto">
              Choose the plan that best fits your needs. All plans include core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
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
          <div className="text-center mt-8 select-none">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span>Monthly</span>
              <input 
                type="checkbox" 
                className="toggle toggle-primary" 
                checked={isAnnual}
                onChange={() => setIsAnnual(!isAnnual)}
              />
              <span>Annually (Save {annualDiscount * 100}%)</span>
            </div>
            <p className="text-sm text-base-content/70 mt-4">
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
      <div className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Your Organized Semester Today</h2>
          <p className="mb-6 sm:mb-8">Join thousands of students who are mastering their academic schedules with Ivy AI.</p>
          <Link to="/auth" className="btn btn-primary btn-lg">Try Ivy Now - It's Free</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer p-6 sm:p-10 bg-base-200 text-base-content">
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
