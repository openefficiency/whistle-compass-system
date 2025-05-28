"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"

interface Case {
  id: string
  reportId: string
  title: string
  status: "open" | "investigating" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "critical"
  submittedDate: string
  assignedTo?: string
  category: string
}

interface CaseTableProps {
  cases: Case[]
  onViewCase?: (caseId: string) => void
  onEditCase?: (caseId: string) => void
  onDeleteCase?: (caseId: string) => void
}

const statusColors = {
  open: "bg-blue-100 text-blue-800",
  investigating: "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
}

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
}

export default function CaseTable({ cases, onViewCase, onEditCase, onDeleteCase }: CaseTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Report ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((case_) => (
            <TableRow key={case_.id}>
              <TableCell className="font-medium">{case_.reportId}</TableCell>
              <TableCell className="max-w-[200px] truncate">{case_.title}</TableCell>
              <TableCell>
                <Badge className={statusColors[case_.status]} variant="secondary">
                  {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={priorityColors[case_.priority]} variant="secondary">
                  {case_.priority.charAt(0).toUpperCase() + case_.priority.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{case_.category}</TableCell>
              <TableCell>{case_.assignedTo || "Unassigned"}</TableCell>
              <TableCell>{new Date(case_.submittedDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewCase?.(case_.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditCase?.(case_.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Case
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDeleteCase?.(case_.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Case
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
