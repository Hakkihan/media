import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from './Button';
import {useThunk} from '../hooks/use-thunk';
import UsersListItem from "./UsersListItem";



function UsersList() {
    // const dispatch69 = useDispatch();
    // const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    // const [loadingUsersError, setLoadingUsersError] = useState(null);
    const [ doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    // const [isCreatingUser, setIsCreatingUser] = useState(false);
    // const [creatingUserError, setCreatingUserError] = useState(null); 
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
    
    const { /*contentIsLoading,*/ ourUsersData, /*error1*/} = useSelector((state) => { //useSelector looks at the large state object and fetches what we need
        return state.users35;
    });

    const handleUserAdd = () => {
        // setIsCreatingUser(true);
        // dispatch69(addUser()).unwrap()
        //                     .catch(err => setCreatingUserError(err))
        //                     .finally(() => setIsCreatingUser(false));
        doCreateUser();
    };

    useEffect(() => {
        // setIsLoadingUsers(true);
        // dispatch69(fetchUsers()).unwrap()
        //                 .then(() => { })
        //                 .catch((err) => { setLoadingUsersError(err); })
        //                 .finally(() => { setIsLoadingUsers(false) });
        doFetchUsers();
    }, [/*dispatch69*/ doFetchUsers ]);

    let content;
    if(/*contentIsLoading*/ isLoadingUsers){
        content =  <Skeleton times={6} className="h-10 w-full" />
    } else if(/*error1*/ loadingUsersError){
        content = <div>Error fetching data...</div>;
    } else {
        content = ourUsersData.map((user) => {
            return <UsersListItem key={user.id} user={user}/>

        });
    }

    return <div>
            <div className="flex flex-row justify-between items-center m-3">
                <h1 className="m-2 text-xl">Users</h1>
                    <Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>               
                {creatingUserError && 'Error creating user...'}
                
            </div>
            
            {content}
            </div>;




    // return 'Users List';
}

export default UsersList;