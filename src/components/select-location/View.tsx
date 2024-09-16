import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const View = forwardRef(
  (
    {
      data,
      values,
    }: {
      data: Array<{
        code: string;
        parent_code: string | null;
        name: string;
        type: string;
      }>;
      values: {
        city: string;
        district: string;
        ward: string;
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: any
  ) => {
    const [locations, setLocations] = useState<{
      [key: string]: Array<{
        code: string;
        parent_code: string | null;
        name: string;
        type: string;
      }>;
    }>({
      cities: [],
      districts: [],
      wards: [],
    });
    const [target, setTarget] = useState(values);

    useImperativeHandle(ref, () => ({
      value: () =>
        Object.keys(target).reduce((prev, next) => {
          return prev + target[next as keyof typeof target] + ", ";
        }, ""),
    }));

    useEffect(() => {
      setLocations({
        cities: data.filter(
          (item) => item.type === "city" || item.type === "province"
        ),
        districts: data.filter((item) => item.type === "district"),
        wards: data.filter(
          (item) => item.type === "ward" || item.type === "commune"
        ),
      });
    }, [data]);

    const changeHandler = (key: keyof typeof target, value: string) => {
      setTarget((state) => ({
        ...state,
        [key]: value,
      }));
    };

    return (
      <div className="flex gap-2 w-full">
        <select
          value={target.city}
          name=""
          id=""
          className="w-1/3"
          onChange={(e) => changeHandler("city", e.target.value)}
        >
          <option value="">Chọn tỉnh / thành phố</option>
          {locations.cities?.map((item) => (
            <option value={item.name}>{item.name}</option>
          ))}
        </select>
        <select
          value={target.district}
          name=""
          id=""
          className="w-1/3"
          onChange={(e) => changeHandler("district", e.target.value)}
        >
          <option value="">Chọn quận / huyện</option>
          {locations.districts
            ?.filter(
              (item) =>
                item.parent_code ===
                (locations.cities?.find((c) => c.name === target.city)?.code ||
                  "")
            )
            .map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
        </select>
        <select
          value={target.ward}
          name=""
          id=""
          className="w-1/3"
          onChange={(e) => changeHandler("ward", e.target.value)}
        >
          <option value="">Chọn phường / xã</option>
          {locations.wards
            ?.filter(
              (item) =>
                item.parent_code ===
                (locations.districts?.find((c) => c.name === target.district)
                  ?.code || "")
            )
            .map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
        </select>
      </div>
    );
  }
);

export default View;
