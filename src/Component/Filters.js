import React from 'react';

const Filters = ({ setFilter }) => {
  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  return (
    <div className="filters">
      <button onClick={() => handleFilter('Все')}>Все</button>
      <button onClick={() => handleFilter('Выполненные')}>Выполненные</button>
      <button onClick={() => handleFilter('В процессе')}>В процессе</button>
    </div>
  );
};

export default Filters;
