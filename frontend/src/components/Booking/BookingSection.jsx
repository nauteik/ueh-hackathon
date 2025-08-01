import React from 'react'
import BookingForm from './BookingForm'
import ExperiencePackages from './ExperiencePackages'

const BookingSection = () => {
  return (
    <section className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            📅 Đặt lịch trải nghiệm
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tham gia các buổi biểu diễn rối nước trực tiếp và workshop học nghệ thuật truyền thống
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <BookingForm />
          <ExperiencePackages />
        </div>
      </div>
    </section>
  )
}

export default BookingSection