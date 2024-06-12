import { ID, Query } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { account, databases } from '../../config';
import { DateConvert } from '../DateConvert';
import '../Styles/UserData.css';
export const UserData = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState([]);
    const [iterateData, setIterateData] = useState([]);
    const [lastIteration,setLastIteration]=useState(0);
    const [showNote,setShowNote]=useState({});
    const [data, setData] = useState({
        Date: '',
        Amount: 0,
        Note:''
    });
  useEffect(()=>{
    if(userData.length>=7){
        let j=0;
        let i;
        for( i=userData.length-1;i>=userData.length-1-7;i--){
                iterateData[j++]=userData[i];
        }
        setLastIteration(i);
    }
  },[])
  const authStatus = useSelector((state) => state.authSlice.status);
 

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const result = await account.get();
                console.log(result);
                setUser(result);
            } catch (error) {
                console.log("No account", error);
            }
        };

        fetchAccount();
    }, []);
    const toggleNote = (id) => {
        setShowNote((prevState) => ({
          ...prevState,
          [id]: !prevState[id],
        }));
      };
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const response = await databases.listDocuments(
                        '6656a57e002234baa87a',
                        '6656a588002449f41782',
                        [Query.equal('ID', user.$id)]  // Adjust field name as necessary
                    );
                    console.log("Response data ---------", response);
                    setUserData(response.documents);
                } catch (error) {
                    console.log("No data", error);
                }
            }
        };

        fetchData();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await databases.createDocument(
                '6656a57e002234baa87a',
                '6656a588002449f41782',
                ID.unique(),
                {
                    ID: String(user.$id),  // Adjust field name as necessary
                    Date: data.Date,
                    Money: parseFloat(data.Amount),
                    Note:data.Note
                }
            );
            console.log("Response", response);
            setUserData((prevData) => [...prevData, response.document]);
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <div className='user-container'>
            <h1 className='heading'>Add Your Expenses</h1>
            <form onSubmit={handleSubmit} className='userdata'>
                <input
                    type='date'
                    value={data.Date}
                    onChange={(e) => setData({ ...data, Date: e.target.value })}
                    className='data-field'
                />
                <input
                    type='number'
                    placeholder='0'
                    value={data.Amount}
                    onChange={(e) => setData({ ...data, Amount: e.target.value })}
                      className='data-field'
                />
                <input type='text' placeholder='add your text' value={data.Note} onChange={(e)=>setData({...data,Note:e.target.value})}   className='data-field'></input>
                <button type="submit" className='submit'>Add</button>
            </form>
            <h2 className='expenseslist'>Your Expenses Table: </h2>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Money</th>
                    <th>Note</th>

                </tr>
                {userData.map((item) => (
                    <tr key={item.$id}>
                       <td><DateConvert timestamp={item.Date}/></td>
                       <td>Rs{item.Money} </td>
                       <td>
            {showNote[item.$id] ? (
              item.Note
            ) : (
              <button onClick={() => toggleNote(item.$id)} className='shownotebtn'>Show Note</button>
            )}
          </td>
                    </tr>
                ))}
            </table>        
         
        </div>
    );
};
