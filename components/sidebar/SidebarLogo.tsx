import Image from "next/image";

export default function SidebarLogo() {
  return (
    <div className="border-b px-5 py-5  group-data-[collapsible=icon]:px-3">

    <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">

        <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-blue-600
            to-cyan-500
            text-white
            text-xl
            font-bold
            shadow-lg
        "
        >
            🏥
        </div>

        <div>

            <h2 className="font-bold">
                HMS
            </h2>

            <p className="text-xs text-slate-500">
                Hospital ERP
            </p>

        </div>

    </div>

</div>
  );
}