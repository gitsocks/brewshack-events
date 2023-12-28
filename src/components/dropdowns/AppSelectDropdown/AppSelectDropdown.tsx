import { Application } from "@prisma/client";
import Link from "next/link";

interface AppSelectDropdownProps {
    applications?: Application[];
    onSelectChange: (application?: Application) => void;
}

export const AppSelectDropdown = ({ applications = [], onSelectChange }: AppSelectDropdownProps) => applications.length > 0 ? (
    <select onChange={(e) => onSelectChange(applications.find(a => a.id == Number(e.target.value)))}>
        {applications.map(application => (
            <option key={application.id} value={application.id}>{application.name}</option>
        ))}
    </select>
) : (
    <Link href={{
        pathname: '/apps/create'
    }}>
        <button>Create New Application</button>
    </Link>
);