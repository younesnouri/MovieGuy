import React from 'react'
import "./barchart.css"

export const BarChart = () => {
  return (
    
<section class="d-flex vh-100 bg-lightwhite" id="skills">
  <div class="position-relative flex-grow-1 bg-img"></div>
  <div class="d-flex justify-content-center align-items-center flex-grow-1">
    <div class="position-relative chart-wrapper">
      <ul class="chart-skills">
        <li class="position-relative">
          <span>CSS</span>
        </li>
        <li class="position-relative">
          <span>HTML</span>
        </li>
        <li class="position-relative">
          <span>JavaScript</span>
        </li>
        <li class="position-relative">
          <span>Python</span>
        </li>
        <li class="position-relative">
          <span>Ruby</span>
        </li>
      </ul>
      <ul class="d-flex position-absolute chart-levels">
        <li class="flex-grow-1 position-relative">
          <span class="position-absolute">Novice</span>
        </li>
        <li class="flex-grow-1 position-relative">
          <span class="position-absolute">Beginner</span>
        </li>
        <li class="flex-grow-1 position-relative">
          <span class="position-absolute">Intermediate</span>
        </li>
        <li class="flex-grow-1 position-relative">
          <span class="position-absolute">Advanced</span>
        </li>
        <li class="flex-grow-1 position-relative">
          <span class="position-absolute">Expert</span>
        </li>
      </ul>
    </div>
  </div>
</section>
  )
}


