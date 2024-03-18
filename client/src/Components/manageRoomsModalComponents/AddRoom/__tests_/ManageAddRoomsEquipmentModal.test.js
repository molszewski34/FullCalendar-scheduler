import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ManageAddRoomsEquipmentModal from '../ManageAddRoomsEquipmentModal';
import { EventContext } from '../../../../contexts/event.context';
describe('ManageAddRoomsEquipmentModal', () => {
  it('should update equipment list correctly when adding equipment', () => {
    const contextValues = {
      setOpenAddRoomEquipmentModal: jest.fn(),
      addSelectedEquipment: [],
      setAddSelectedEquipment: jest.fn(),
      equipmentList: [
        { name: 'Lodówka', icon: 'kitchen' },
        { name: 'Mikrofalówka', icon: 'microwave' },
        { name: 'Prysznic', icon: 'shower' },
        { name: 'Wanna', icon: 'bathtub' },
        { name: 'Grill', icon: 'outdoor_grill' },
      ],
      setEquipmentList: jest.fn(),
    };

    const { getByText } = render(
      <EventContext.Provider value={contextValues}>
        <ManageAddRoomsEquipmentModal />
      </EventContext.Provider>
    );

    fireEvent.click(getByText('Lodówka +'));

    expect(contextValues.setEquipmentList).toHaveBeenCalledWith([
      { name: 'Mikrofalówka', icon: 'microwave' },
      { name: 'Prysznic', icon: 'shower' },
      { name: 'Wanna', icon: 'bathtub' },
      { name: 'Grill', icon: 'outdoor_grill' },
    ]);
  });
});
