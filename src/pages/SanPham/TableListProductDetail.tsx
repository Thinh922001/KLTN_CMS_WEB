import { Table,TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IProduct, IProductDetailGetFromProduct, IProductGet } from '@/Types/Product'
import { Eye, Loader, Trash } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    product:IProductGet
}
const TableListProductDetail = ({product}:Props):JSX.Element=>{
    const navigate = useNavigate()
    return(
        <>
            <h2>Các sản phẩm con của {product.productName}</h2>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]"># ID</TableHead>
                <TableHead>Ảnh</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Giá cũ</TableHead>
                <TableHead>Giảm giá phần trăm</TableHead>
                <TableHead>Số lượng tồn tại</TableHead>
                <TableHead>Hành động</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    product?.productDetails?.map((item: IProductDetailGetFromProduct) => (
                        <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                            <img
                            src={item?.productDetailsImg?.[0]?.img || ""}
                            alt=""
                            className="w-16 h-16 rounded-sm object-cover"
                            />
                        </TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.oldPrice}</TableCell>
                        <TableCell>{item.discountPercent} %</TableCell>
                        <TableCell>{item.stock}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2 items-center">
                            <span
                                className="cursor-pointer"
                                onClick={() => navigate(`/chitietsanpham/${item.id}`)}
                            >
                                <Eye
                                className="text-sky-700"
                                style={{ color: 'blue' }}
                                />
                            </span>
                            <span
                                className="cursor-pointer"
                                // onClick={() => handleOpenModelDelete(item)}
                            >
                                <Trash
                                className="text-red-600"
                                style={{ color: 'red' }}
                                />
                            </span>
                            </div>
                        </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            </Table>
        </>
    )
}
export default TableListProductDetail