"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";

export const MeetingsListHeader =() => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return(
        <>  
        <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
        <div className="py-4 px-4 md;px-8 flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <h5 className="font-medium text-x1">My Meetings</h5>
                <Button onClick={() => setIsDialogOpen(true)}> 
                    <PlusIcon/>
                    New Meeting
                </Button>
            </div>
            <div className="flex items-center gap-x-2 p-1">
                {/* <AgentsSearchFilter/>
                {isAnyFilterModified && (
                    <Button variant="outline" size="sm" onClick={onClearFilters}>
                        <XCircleIcon />
                        Clear
                    </Button>
                )} */}
                TODO: Filters
            </div>
        </div>
    </>
    );
};