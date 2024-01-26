import React from "react"
import { useState, useEffect } from "react"


export default function EquipmentTable(props) {

    const [equipmentList, setEquipmentList] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [updateName, setUpdateName] = useState('');
    const [updateType, setUpdateType] = useState('');
    const [updateAmount, setUpdateAmount] = useState('');
    const setPage = props.setPage

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await fetch('/api/equipments');
                const data = await response.json();
                console.log(data);
                setEquipmentList(data)


            } catch (error) {
                console.error(error);
            }


        }

        fetchEquipment()
    }, [])

    const editEquipment = async (itemId) => {
        try {
            const response = await fetch(`/api/equipments/${itemId}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    equipmentName: updateName,
                    type: updateType,
                    amount: updateAmount
                })
            });
            if (response.ok) {
                const updatedEquipments = equipmentList.map((item) => item._id === itemId ?
                    {
                        ...item,
                        equipmentName: updateName,
                        type: updateType,
                        amount: updateAmount
                    } : item);
                setEquipmentList(updatedEquipments);
                setEditingItem(null)
                setUpdateName('')
                setUpdateType('')
                setUpdateAmount('')
            } else {
                console.error('Failed update item');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteEquipment = async (itemId) =>{

        try{
            const response = await fetch(`/api/equipments/${itemId}`,{
                method: 'DELETE'
            });

            if(response.ok){
                const updatedItems = equipmentList.filter((item) => item._id !== itemId);
                setEquipmentList(updatedItems)
            }else{
                console.error('Failed delete item');
            }

        }catch(error){
            console.error(error);
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Type</td>
                    <td>Amount</td>
                    <td>ID</td>
                </tr>
            </thead>
            <tbody>
                {equipmentList.map(item => (
                    <tr key={item._id}>
                        <td>{item.equipmentName}</td>
                        <td>{item.type}</td>
                        <td>{item.amount}</td>
                        <td>{item._id}</td>
                        {editingItem === item._id ? (
                            <>
                                <td>
                                    <input type="text"
                                        placeholder="New name"
                                        value={updateName}
                                        onChange={(e) => setUpdateName(e.target.value)} />
                                </td>
                                <td>
                                    <input type="text"
                                        placeholder="New type"
                                        value={updateType}
                                        onChange={(e) => setUpdateType(e.target.value)} />
                                </td>
                                <td>
                                    <input type="text"
                                        placeholder="New amount"
                                        value={updateAmount}
                                        onChange={(e) => setUpdateAmount(e.target.value)} />
                                </td>
                                <td><button onClick={() => editEquipment(item._id)}>Save</button></td>
                            </>
                        ) : (
                            <>
                                <td>
                                    <button onClick={() => setEditingItem(item._id)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteEquipment(item._id)}>Delete</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}