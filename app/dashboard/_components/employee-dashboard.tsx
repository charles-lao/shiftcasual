import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { getAvailability } from '@/lib/availability';
import { filterPastDates } from '@/lib/availability-actions';
import { getAssignedShifts } from '@/lib/shifts';

import { format, parseISO } from 'date-fns';
import Link from 'next/link';

import { getCurrentUserId } from '@/lib/auth';
import OpenShiftsCard from '@/components/open-shifts-card';

export default async function EmployeeDashboard() {

    const currentUserId = await getCurrentUserId();
    const availabilities = await getAvailability(currentUserId);
    const assignedShifts = await getAssignedShifts(currentUserId);

    //filter out past dates
    const filteredAvailabilities = filterPastDates(availabilities);
    const filteredAssignedShifts = filterPastDates(assignedShifts);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return (
        <>
            <Card className="p-4 m-8 flex-1 flex-col">
                <CardHeader>
                <CardTitle>Your Availability</CardTitle>
                <CardDescription className="pt-2"><Link href="/availability">Click here to view all</Link></CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableCaption className="pt-2"><Link href="/availability">Click here to view all</Link></TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[100px]">Time Start</TableHead>
                        <TableHead className="w-[100px]">Time Finish</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredAvailabilities.map((filteredAvailability) => (
                        <TableRow key={filteredAvailability.id}>
                        <TableCell className="font-medium">{format(parseISO(filteredAvailability.dateStart), 'MMMM do')}</TableCell>
                        <TableCell>{format(parseISO(filteredAvailability.dateStart), 'h:mm a')}</TableCell>
                        <TableCell>{format(parseISO(filteredAvailability.dateEnd), 'h:mm a')}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>

            <Card className="p-4 m-8 flex-1 flex-col">
                <CardHeader>
                <CardTitle>Your Upcoming Assigned Shifts</CardTitle>
                <CardDescription className="pt-2"><Link href="/your-availability">Click here to view all</Link></CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableCaption className="pt-2"><Link href="/your-availability">Click here to view all</Link></TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[100px]">Time Start</TableHead>
                        <TableHead className="w-[100px]">Time Finish</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredAssignedShifts.map((filteredAssignedShift) => (
                        <TableRow key={filteredAssignedShift.id}>
                            <TableCell className="font-medium">{format(parseISO(filteredAssignedShift.dateStart), 'MMMM do')}</TableCell>
                            <TableCell>{format(parseISO(filteredAssignedShift.dateStart), 'h:mm a')}</TableCell>
                            <TableCell>{format(parseISO(filteredAssignedShift.dateEnd), 'h:mm a')}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>

            <OpenShiftsCard />
        </>
    )
}