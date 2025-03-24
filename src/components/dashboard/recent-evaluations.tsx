import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentEvaluations() {
  return (
    <div className="space-y-8">
      {recentEvaluations.map((evaluation) => (
        <div key={evaluation.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={evaluation.avatar} alt="Avatar" />
            <AvatarFallback>{evaluation.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {evaluation.name}
            </p>
            <p className="text-sm text-muted-foreground">{evaluation.class}</p>
          </div>
          <div className="ml-auto font-medium">{evaluation.rating}</div>
        </div>
      ))}
    </div>
  );
}

const recentEvaluations = [
  {
    id: "1",
    name: "Mathematics 101",
    class: "Morning Session",
    rating: "4.8",
    avatar: "/avatars/01.png",
    initials: "M1",
  },
  {
    id: "2",
    name: "Mathematics 102",
    class: "Afternoon Session",
    rating: "4.6",
    avatar: "/avatars/02.png",
    initials: "M2",
  },
  {
    id: "3",
    name: "Advanced Calculus",
    class: "Evening Session",
    rating: "4.9",
    avatar: "/avatars/03.png",
    initials: "AC",
  },
  {
    id: "4",
    name: "Linear Algebra",
    class: "Morning Session",
    rating: "4.7",
    avatar: "/avatars/04.png",
    initials: "LA",
  },
  {
    id: "5",
    name: "Statistics",
    class: "Afternoon Session",
    rating: "4.5",
    avatar: "/avatars/05.png",
    initials: "ST",
  },
];
