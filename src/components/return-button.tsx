import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

export const ReturnButton = ({ href, label }: Props) => {
  return (
    <Button size="sm" asChild>
      <Link href={href}>
        <ArrowLeftIcon /> <span>{label}</span>
      </Link>
    </Button>
  );
};