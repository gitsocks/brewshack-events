import { Application } from "@prisma/client";
import Link from "next/link";

interface AppSelectDropdownProps {
    applications?: Application[];
}

export const AppSelectDropdown = ({ applications = [] }: AppSelectDropdownProps) => applications.length > 0 ? (
    <select>
        <option value="doinfine">Doinfine</option>
        <option value="volvo">Carbud</option>
    </select>
) : (
    <Link href={{
        pathname: '/apps/create'
    }}>
        <button>Create New Application</button>
    </Link>
);