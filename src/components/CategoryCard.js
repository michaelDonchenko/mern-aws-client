import React from 'react'
import { Card } from 'react-bootstrap'

const CategoryCard = ({ category }) => {
  return (
    <Card
      className="myCard"
      style={{
        width: '20rem',
        margin: '10px',
        border: '1px solid',
        borderColor: 'lightgray',
      }}
    >
      <div>
        <img
          style={{ height: '70px', width: 'auto', padding: '5px' }}
          src={category.image.url}
        />{' '}
        <span style={{ marginLeft: '5px', fontSize: '20px' }}>
          {category.name}
        </span>
      </div>
    </Card>
  )
}

export default CategoryCard
