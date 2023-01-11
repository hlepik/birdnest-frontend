import {useCallback, useEffect, useState} from "react";
import {IPilot} from "../../dto/IPilot";
import {styled, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {BaseService} from "../../service/base-service";

const StyledArrowDropUpIcon = styled(ArrowDropUpIcon) ({
    fontSize: "2rem",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "darkcyan",
        borderRadius: "3rem"
    }

});
const StyledArrowDropDownIcon = styled(ArrowDropDownIcon) ({
    fontSize: "2rem",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "darkcyan",
        borderRadius: "3rem"
    }
});
const PilotIndex = () => {

    const [allPilots, setAllPilots] = useState([] as IPilot[]);

    const loadData = useCallback(async () => {
        let result = await BaseService.getAll<IPilot>(
            "/Pilots"
        );
        if (result.ok && result.data) {
            sort(result.data)
        }
    }, []);

    const applySorting = (key: string, ascending: boolean) => {
        localStorage.setItem("key", key)
        localStorage.setItem("ascending", String(ascending))
        sort(allPilots)

    }
    const sort = (data: IPilot[]) => {

        const sortedPilots = data.sort((a: any, b: any) => {
            const key = localStorage.getItem("key") || "firstName";
            return (a[key] > b[key]) ? 1 : -1;

        });

        const ascending = localStorage.getItem("ascending");
        setAllPilots(
            ascending === "true" ? sortedPilots : sortedPilots.reverse()
        );

    }
    useEffect(() => {

        setInterval(() => {
            loadData();
        }, 2000);


    }, [loadData]);

    return (
        <div>

            <Table className="mainTable">
                <TableHead className="tableHeader">
                    <TableRow >
                        <TableCell/>
                        <TableCell >
                            <div className="styledCell">
                                <h2>First Name</h2>
                                <div className="styledArrows">
                                    <div onClick={() => applySorting("firstName", true)}><StyledArrowDropUpIcon className="arrowUp"/></div>
                                    <div onClick={() => applySorting("firstName", false)}><StyledArrowDropDownIcon className="arrowDown"/></div>
                                </div>
                            </div>

                        </TableCell>
                        <TableCell >
                            <div className="styledCell">
                                <h2>Last Name</h2>
                                <div className="styledArrows">
                                    <div onClick={() => applySorting("lastName", true)}><StyledArrowDropUpIcon  className="arrowUp"/></div>
                                    <div onClick={() => applySorting("lastName", false)}><StyledArrowDropDownIcon className="arrowDown"/></div>
                                </div>
                            </div>

                        </TableCell>
                        <TableCell >
                            <h2>Email</h2>
                        </TableCell>
                        <TableCell>
                            <h2>Phone</h2>
                        </TableCell>
                        <TableCell>
                            <div className="styledCell">
                                <h2>Closest distance</h2>
                                <div className="styledArrows">
                                    <div onClick={() => applySorting("distance", true)}><StyledArrowDropUpIcon className="arrowUp"/></div>
                                    <div onClick={() => applySorting("distance", false)}><StyledArrowDropDownIcon className="arrowDown"/></div>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allPilots.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.firstName}</TableCell>
                            <TableCell>{item.lastName}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phoneNumber}</TableCell>
                            <TableCell>{item.distance.toFixed(1)}m</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
};

export default PilotIndex;