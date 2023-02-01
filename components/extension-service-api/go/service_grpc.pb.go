// Copyright (c) 2023 Gitpod GmbH. All rights reserved.
// Licensed under the GNU Affero General Public License (AGPL).
// See License-AGPL.txt in the project root for license information.

// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.20.1
// source: service.proto

package api

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ExtensionServiceClient is the client API for ExtensionService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ExtensionServiceClient interface {
	// Hook point 1
	PreStartWorkspaceModifyHook(ctx context.Context, in *PreStartWorkspaceModifyRequest, opts ...grpc.CallOption) (*PreStartWorkspaceModifyResponse, error)
	// Hook point 4
	PostCreateWorkspacePodModifyHook(ctx context.Context, in *PostCreateWorkspacePodModifyRequest, opts ...grpc.CallOption) (*PostCreateWorkspacePodModifyResponse, error)
	// Hook point 3
	PreStartImageBuildWorkspaceNotifyHook(ctx context.Context, in *PreStartImageBuildWorkspaceNotifyRequest, opts ...grpc.CallOption) (*PreStartImageBuildWorkspaceNotifyResponse, error)
	// Hook point 2
	PreCallImageBuilderModifyHook(ctx context.Context, in *PreCallImageBuilderModifyRequest, opts ...grpc.CallOption) (*PreCallImageBuilderModifyResponse, error)
}

type extensionServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewExtensionServiceClient(cc grpc.ClientConnInterface) ExtensionServiceClient {
	return &extensionServiceClient{cc}
}

func (c *extensionServiceClient) PreStartWorkspaceModifyHook(ctx context.Context, in *PreStartWorkspaceModifyRequest, opts ...grpc.CallOption) (*PreStartWorkspaceModifyResponse, error) {
	out := new(PreStartWorkspaceModifyResponse)
	err := c.cc.Invoke(ctx, "/extension_service.ExtensionService/preStartWorkspaceModifyHook", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *extensionServiceClient) PostCreateWorkspacePodModifyHook(ctx context.Context, in *PostCreateWorkspacePodModifyRequest, opts ...grpc.CallOption) (*PostCreateWorkspacePodModifyResponse, error) {
	out := new(PostCreateWorkspacePodModifyResponse)
	err := c.cc.Invoke(ctx, "/extension_service.ExtensionService/PostCreateWorkspacePodModifyHook", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *extensionServiceClient) PreStartImageBuildWorkspaceNotifyHook(ctx context.Context, in *PreStartImageBuildWorkspaceNotifyRequest, opts ...grpc.CallOption) (*PreStartImageBuildWorkspaceNotifyResponse, error) {
	out := new(PreStartImageBuildWorkspaceNotifyResponse)
	err := c.cc.Invoke(ctx, "/extension_service.ExtensionService/preStartImageBuildWorkspaceNotifyHook", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *extensionServiceClient) PreCallImageBuilderModifyHook(ctx context.Context, in *PreCallImageBuilderModifyRequest, opts ...grpc.CallOption) (*PreCallImageBuilderModifyResponse, error) {
	out := new(PreCallImageBuilderModifyResponse)
	err := c.cc.Invoke(ctx, "/extension_service.ExtensionService/preCallImageBuilderModifyHook", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ExtensionServiceServer is the server API for ExtensionService service.
// All implementations must embed UnimplementedExtensionServiceServer
// for forward compatibility
type ExtensionServiceServer interface {
	// Hook point 1
	PreStartWorkspaceModifyHook(context.Context, *PreStartWorkspaceModifyRequest) (*PreStartWorkspaceModifyResponse, error)
	// Hook point 4
	PostCreateWorkspacePodModifyHook(context.Context, *PostCreateWorkspacePodModifyRequest) (*PostCreateWorkspacePodModifyResponse, error)
	// Hook point 3
	PreStartImageBuildWorkspaceNotifyHook(context.Context, *PreStartImageBuildWorkspaceNotifyRequest) (*PreStartImageBuildWorkspaceNotifyResponse, error)
	// Hook point 2
	PreCallImageBuilderModifyHook(context.Context, *PreCallImageBuilderModifyRequest) (*PreCallImageBuilderModifyResponse, error)
	mustEmbedUnimplementedExtensionServiceServer()
}

// UnimplementedExtensionServiceServer must be embedded to have forward compatible implementations.
type UnimplementedExtensionServiceServer struct {
}

func (UnimplementedExtensionServiceServer) PreStartWorkspaceModifyHook(context.Context, *PreStartWorkspaceModifyRequest) (*PreStartWorkspaceModifyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PreStartWorkspaceModifyHook not implemented")
}
func (UnimplementedExtensionServiceServer) PostCreateWorkspacePodModifyHook(context.Context, *PostCreateWorkspacePodModifyRequest) (*PostCreateWorkspacePodModifyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PostCreateWorkspacePodModifyHook not implemented")
}
func (UnimplementedExtensionServiceServer) PreStartImageBuildWorkspaceNotifyHook(context.Context, *PreStartImageBuildWorkspaceNotifyRequest) (*PreStartImageBuildWorkspaceNotifyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PreStartImageBuildWorkspaceNotifyHook not implemented")
}
func (UnimplementedExtensionServiceServer) PreCallImageBuilderModifyHook(context.Context, *PreCallImageBuilderModifyRequest) (*PreCallImageBuilderModifyResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PreCallImageBuilderModifyHook not implemented")
}
func (UnimplementedExtensionServiceServer) mustEmbedUnimplementedExtensionServiceServer() {}

// UnsafeExtensionServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ExtensionServiceServer will
// result in compilation errors.
type UnsafeExtensionServiceServer interface {
	mustEmbedUnimplementedExtensionServiceServer()
}

func RegisterExtensionServiceServer(s grpc.ServiceRegistrar, srv ExtensionServiceServer) {
	s.RegisterService(&ExtensionService_ServiceDesc, srv)
}

func _ExtensionService_PreStartWorkspaceModifyHook_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PreStartWorkspaceModifyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ExtensionServiceServer).PreStartWorkspaceModifyHook(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/extension_service.ExtensionService/preStartWorkspaceModifyHook",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ExtensionServiceServer).PreStartWorkspaceModifyHook(ctx, req.(*PreStartWorkspaceModifyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ExtensionService_PostCreateWorkspacePodModifyHook_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PostCreateWorkspacePodModifyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ExtensionServiceServer).PostCreateWorkspacePodModifyHook(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/extension_service.ExtensionService/PostCreateWorkspacePodModifyHook",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ExtensionServiceServer).PostCreateWorkspacePodModifyHook(ctx, req.(*PostCreateWorkspacePodModifyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ExtensionService_PreStartImageBuildWorkspaceNotifyHook_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PreStartImageBuildWorkspaceNotifyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ExtensionServiceServer).PreStartImageBuildWorkspaceNotifyHook(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/extension_service.ExtensionService/preStartImageBuildWorkspaceNotifyHook",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ExtensionServiceServer).PreStartImageBuildWorkspaceNotifyHook(ctx, req.(*PreStartImageBuildWorkspaceNotifyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _ExtensionService_PreCallImageBuilderModifyHook_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PreCallImageBuilderModifyRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ExtensionServiceServer).PreCallImageBuilderModifyHook(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/extension_service.ExtensionService/preCallImageBuilderModifyHook",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ExtensionServiceServer).PreCallImageBuilderModifyHook(ctx, req.(*PreCallImageBuilderModifyRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ExtensionService_ServiceDesc is the grpc.ServiceDesc for ExtensionService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ExtensionService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "extension_service.ExtensionService",
	HandlerType: (*ExtensionServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "preStartWorkspaceModifyHook",
			Handler:    _ExtensionService_PreStartWorkspaceModifyHook_Handler,
		},
		{
			MethodName: "PostCreateWorkspacePodModifyHook",
			Handler:    _ExtensionService_PostCreateWorkspacePodModifyHook_Handler,
		},
		{
			MethodName: "preStartImageBuildWorkspaceNotifyHook",
			Handler:    _ExtensionService_PreStartImageBuildWorkspaceNotifyHook_Handler,
		},
		{
			MethodName: "preCallImageBuilderModifyHook",
			Handler:    _ExtensionService_PreCallImageBuilderModifyHook_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "service.proto",
}
