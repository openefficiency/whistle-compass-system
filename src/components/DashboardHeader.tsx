
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bell, Search, Shield, Settings, User } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  userRole: string;
}

const DashboardHeader = ({ title, userRole }: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-blue-800" />
              <span className="ml-2 text-xl font-bold text-blue-900">WhistleGuard</span>
            </Link>
            <span className="mx-4 text-gray-300">|</span>
            <h1 className="text-lg font-medium text-gray-800">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800"
              />
            </div>
            
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="bg-blue-800 text-white p-1 rounded-full">
                <User className="h-5 w-5" />
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium">Admin User</div>
                <div className="text-xs text-gray-500">{userRole}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
