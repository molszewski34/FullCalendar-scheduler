const useEventDidMount = () => {
  const handleEventDidMount = (info) => {
    const backgroundColor = info.event.extendedProps.color || 'gray';
    const el = info.el;
    el.style.background = backgroundColor;
    el.style.fontWeight = 'bold';
    const dateElement = document.createElement('div');
    dateElement.textContent = ` ${info.event.extendedProps.room}`;
    dateElement.style.color = '#e2e8f0';
    dateElement.style.fontWeight = 'bold';
    dateElement.style.marginLeft = '1em';
    info.el.appendChild(dateElement);
  };

  return { handleEventDidMount };
};

export default useEventDidMount;
