// app/(dashboard)/nurse/icu/patients/[uhid]/oxygen/oxygen-device-fields.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  OxygenDevice,
  OxygenDeviceSettings,
} from "@/types/nurse/icu/oxygen-therapy-types";

type OxygenDeviceFieldsProps = {
  device: OxygenDevice;
  settings: Partial<OxygenDeviceSettings>;
  onChange: (patch: Partial<OxygenDeviceSettings>) => void;
};

type DeviceSettings<D extends OxygenDevice> = Partial<
  Extract<OxygenDeviceSettings, { device: D }>
>;

export function OxygenDeviceFields({
  device,
  settings,
  onChange,
}: OxygenDeviceFieldsProps) {
  if (
    device === "Nasal Cannula" ||
    device === "Simple Face Mask" ||
    device === "Non-Rebreather/Reservoir Mask"
  ) {
    const s = settings as
      | DeviceSettings<"Nasal Cannula">
      | DeviceSettings<"Simple Face Mask">
      | DeviceSettings<"Non-Rebreather/Reservoir Mask">;

    return (
      <div>
        <Label className="text-xs text-slate-500">Flow (L/min)</Label>

        <Input
          type="number"
          className="mt-1"
          value={s.flowLpm ?? ""}
          onChange={(e) =>
            onChange({
              flowLpm: e.target.value === "" ? undefined : Number(e.target.value),
            })
          }
          placeholder="e.g. 4"
        />
      </div>
    );
  }

  if (device === "Venturi Mask") {
    const s = settings as DeviceSettings<"Venturi Mask">;

    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-slate-500">Flow (L/min)</Label>

          <Input
            type="number"
            className="mt-1"
            value={s.flowLpm ?? ""}
            onChange={(e) =>
              onChange({
                flowLpm:
                  e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <Label className="text-xs text-slate-500">FiO₂ (%)</Label>

          <Input
            type="number"
            className="mt-1"
            value={s.fiO2Percent ?? ""}
            onChange={(e) =>
              onChange({
                fiO2Percent:
                  e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
          />
        </div>
      </div>
    );
  }

  if (device === "HFNC") {
    const s = settings as DeviceSettings<"HFNC">;

    return (
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label className="text-xs text-slate-500">Flow (L/min)</Label>

          <Input
            type="number"
            className="mt-1"
            value={s.flowLpm ?? ""}
            onChange={(e) =>
              onChange({
                flowLpm:
                  e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <Label className="text-xs text-slate-500">FiO₂ (%)</Label>

          <Input
            type="number"
            className="mt-1"
            value={s.fiO2Percent ?? ""}
            onChange={(e) =>
              onChange({
                fiO2Percent:
                  e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <Label className="text-xs text-slate-500">
            Temp (°C){" "}
            <span className="text-slate-400">optional</span>
          </Label>

          <Input
            type="number"
            className="mt-1"
            value={s.temperatureCelsius ?? ""}
            onChange={(e) =>
              onChange({
                temperatureCelsius:
                  e.target.value === ""
                    ? undefined
                    : Number(e.target.value),
              })
            }
          />
        </div>
      </div>
    );
  }

  if (device === "NIV") {
    const s = settings as DeviceSettings<"NIV">;

    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-slate-500">Mode</Label>

          <Input
            className="mt-1"
            value={s.mode ?? ""}
            onChange={(e) =>
              onChange({
                mode: e.target.value,
              })
            }
            placeholder="e.g. BiPAP, CPAP"
          />
        </div>

        <div>
          <Label className="text-xs text-slate-500">FiO₂ (%)</Label>

          <Input
            type="number"
            className="mt-1"
            value={s.fiO2Percent ?? ""}
            onChange={(e) =>
              onChange({
                fiO2Percent:
                  e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <Label className="text-xs text-slate-500">
            IPAP (cmH₂O)
          </Label>

          <Input
            type="number"
            className="mt-1"
            value={s.ipapCmH2O ?? ""}
            onChange={(e) =>
              onChange({
                ipapCmH2O:
                  e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <Label className="text-xs text-slate-500">
            EPAP (cmH₂O)
          </Label>

          <Input
            type="number"
            className="mt-1"
            value={s.epapCmH2O ?? ""}
            onChange={(e) =>
              onChange({
                epapCmH2O:
                  e.target.value === "" ? undefined : Number(e.target.value),
              })
            }
          />
        </div>
      </div>
    );
  }

  const s = settings as DeviceSettings<"Other">;

  return (
    <div>
      <Label className="text-xs text-slate-500">
        Device Description
      </Label>

      <Input
        className="mt-1"
        value={s.description ?? ""}
        onChange={(e) =>
          onChange({
            description: e.target.value,
          })
        }
        placeholder="Describe device/settings"
      />
    </div>
  );
}

export function formatDeviceSettings(
  settings: OxygenDeviceSettings
): string {
  switch (settings.device) {
    case "Nasal Cannula":
    case "Simple Face Mask":
    case "Non-Rebreather/Reservoir Mask":
      return `${settings.device} · ${settings.flowLpm} L/min`;

    case "Venturi Mask":
      return `${settings.device} · ${settings.flowLpm} L/min · FiO₂ ${settings.fiO2Percent}%`;

    case "HFNC":
      return `${settings.device} · ${settings.flowLpm} L/min · FiO₂ ${settings.fiO2Percent}%${
        settings.temperatureCelsius !== undefined
          ? ` · ${settings.temperatureCelsius}°C`
          : ""
      }`;

    case "NIV":
      return `${settings.device} (${settings.mode}) · IPAP ${settings.ipapCmH2O}/EPAP ${settings.epapCmH2O} · FiO₂ ${settings.fiO2Percent}%`;

    case "Other":
      return `${settings.device} · ${settings.description}`;
  }
}