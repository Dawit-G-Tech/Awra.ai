"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { GenerateAvatar } from "@/components/generate-avatar";
import { authClient } from "@/lib/auth-client";
import { Users, Calendar, RefreshCw, Shield } from "lucide-react";
import { useState } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


export const SettingsView = () => {
    const { data: session } = authClient.useSession();
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
    const [fullName, setFullName] = useState(session?.user?.name || "");
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
    const [location, setLocation] = useState("");

    const handleRefreshData = () => {
        // Refresh user data logic
        console.log("Refreshing data...");
    };

    const handleTwoFactorToggle = (checked: boolean) => {
        setIsTwoFactorEnabled(checked);
        // Implement 2FA logic here
        console.log("2FA toggled:", checked);
    };

    const handleSaveChanges = () => {
        // Save changes logic
        console.log("Saving changes...");
    };

    const handleReset = () => {
        // Reset form logic
        setFullName(session?.user?.name || "");
        setPhoneNumber(undefined);
        setLocation("");
        setIsTwoFactorEnabled(false);
    };

    if (!session?.user) {
        return null;
    }


    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-medium tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - User Summary */}
                <div className="lg:col-span-1 space-y-6">
                    {/* User Avatar and Info */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    {session.user.image ? (
                                        <Avatar className="h-24 w-24">
                                            <img src={session.user.image} alt="User avatar" />
                                        </Avatar>
                                    ) : (
                                        <GenerateAvatar
                                            seed={session.user.name}
                                            variant="initials"
                                            className="h-24 w-24"
                                        />
                                    )}
                                    <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                                        <Shield className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                </div>
                                
                                <div className="text-center space-y-1">
                                    <h3 className="font-semibold text-lg">{session.user.name}</h3>
                                    <p className="text-sm text-muted-foreground">{session.user.email}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="pt-4">
                                <div className="flex flex-col items-center space-y-2">
                                    <Users className="h-6 w-6 text-primary" />
                                    <div className="text-2xl font-bold">1</div>
                                    <p className="text-xs text-muted-foreground text-center">Agents Created</p>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardContent className="pt-4">
                                <div className="flex flex-col items-center space-y-2">
                                    <Calendar className="h-6 w-6 text-primary" />
                                    <div className="text-2xl font-bold">2</div>
                                    <p className="text-xs text-muted-foreground text-center">Meetings Held</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Column - Settings Forms */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Information */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Profile Information</CardTitle>
                            <Button variant="outline" size="sm" onClick={handleRefreshData}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh Data
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="fullName" className="text-sm font-medium">
                                    Full Name
                                </label>
                                <Input
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="phoneNumber" className="text-sm font-medium">
                                    Phone Number
                                </label>
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}
                                    defaultCountry="ET"
                                    international
                                    countryCallingCodeEditable={false}
                                    className="w-full [&_.PhoneInputInput]:flex [&_.PhoneInputInput]:h-9 [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:min-w-0 [&_.PhoneInputInput]:rounded-md [&_.PhoneInputInput]:border [&_.PhoneInputInput]:border-input [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:px-3 [&_.PhoneInputInput]:py-1 [&_.PhoneInputInput]:text-base [&_.PhoneInputInput]:shadow-xs [&_.PhoneInputInput]:transition-[color,box-shadow] [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:focus-visible:border-ring [&_.PhoneInputInput]:focus-visible:ring-ring/50 [&_.PhoneInputInput]:focus-visible:ring-[3px] [&_.PhoneInputInput]:disabled:pointer-events-none [&_.PhoneInputInput]:disabled:cursor-not-allowed [&_.PhoneInputInput]:disabled:opacity-50 [&_.PhoneInputInput]:md:text-sm [&_.PhoneInputCountrySelect]:border-input [&_.PhoneInputCountrySelect]:flex [&_.PhoneInputCountrySelect]:w-fit [&_.PhoneInputCountrySelect]:items-center [&_.PhoneInputCountrySelect]:justify-between [&_.PhoneInputCountrySelect]:gap-2 [&_.PhoneInputCountrySelect]:rounded-md [&_.PhoneInputCountrySelect]:border [&_.PhoneInputCountrySelect]:bg-transparent [&_.PhoneInputCountrySelect]:px-3 [&_.PhoneInputCountrySelect]:py-2 [&_.PhoneInputCountrySelect]:text-sm [&_.PhoneInputCountrySelect]:whitespace-nowrap [&_.PhoneInputCountrySelect]:shadow-xs [&_.PhoneInputCountrySelect]:transition-[color,box-shadow] [&_.PhoneInputCountrySelect]:outline-none [&_.PhoneInputCountrySelect]:focus-visible:ring-[3px] [&_.PhoneInputCountrySelect]:disabled:cursor-not-allowed [&_.PhoneInputCountrySelect]:disabled:opacity-50 [&_.PhoneInputCountrySelect]:h-9"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="location" className="text-sm font-medium">
                                    Location
                                </label>
                                <Input
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter your location"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Settings and Active Sessions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium">Two-Factor Authentication (2FA)</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Add an extra layer of security to your account
                                    </p>
                                </div>
                                <Switch
                                    checked={isTwoFactorEnabled}
                                    onCheckedChange={handleTwoFactorToggle}
                                />
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-2 pt-4">
                                <Button variant="outline" onClick={handleReset}>
                                    Reset
                                </Button>
                                <Button onClick={handleSaveChanges}>
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Achievements Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Your Achievements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Complete tasks to unlock achievements and showcase your progress.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};